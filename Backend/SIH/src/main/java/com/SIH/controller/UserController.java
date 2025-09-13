package com.SIH.controller;

import com.SIH.config.JwtUtil;
import com.SIH.model.RegisterRequestResponse;
import com.SIH.model.User;
import com.SIH.service.RedisService;
import com.SIH.service.UserKafkaProducerService;
import com.SIH.service.UserService;

import com.nimbusds.jose.shaded.gson.Gson;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService authService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserKafkaProducerService userKafkaProducerService;
    @Autowired
    private RedisService redisService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {

        String email=body.get("email");
        String name=body.get("name");
        redisService.set("NEW_REGISTER:" + email, body, 5 * 60 * 1000);
        String otp = String.format("%06d", new Random().nextInt(999999));
        authService.saveOtp(email, otp);


        RegisterRequestResponse event = new RegisterRequestResponse();
        event.setUsername(name);
        event.setEmail(email);
        event.setBody("Your One-Time Password (OTP) is: " + otp
                + ". It will remain valid for 5 minutes. Please do not share this code with anyone for your security.");


        String json = new Gson().toJson(event);
        userKafkaProducerService.sendUserRegistered("otp", json);
        return ResponseEntity.ok(
                Map.of("message", "OTP sent to your email. Please verify to complete registration.")
        );

    }


    @PostMapping("/verify-otp")
    public Map<String, String> verifyOtp(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String otp = body.get("otp");

        if (authService.verifyOtp(email, otp)) {

            Map<String, String> userData = redisService.get("NEW_REGISTER:" + email, Map.class);

            if (userData == null) {
                throw new RuntimeException("Session expired, please register again");
            }

            User u = authService.register(userData.get("name"), userData.get("email"), userData.get("password"));

            redisService.delete("NEW_REGISTER:" + email);

            String token = jwtUtil.generateToken(email);

            return Map.of("token", token, "message", "Registration successful");
        } else {
            throw new RuntimeException("Invalid OTP");
        }
    }



    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> body) {
        return authService.login(body.get("email"), body.get("password")).map(u -> {
            String token = jwtUtil.generateToken(u.getEmail());
            return Map.of("token", token);
        }).orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }
}
