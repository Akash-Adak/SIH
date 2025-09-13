package com.SIH.controller;

import com.SIH.config.JwtUtil;
import com.SIH.model.RegisterRequestResponse;
import com.SIH.model.Role;
import com.SIH.model.User;
import com.SIH.repository.UserRepository;
import com.SIH.service.UserKafkaProducerService;
import com.nimbusds.jose.shaded.gson.Gson;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.ServletException;

import java.io.IOException;
import java.util.Map;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserKafkaProducerService userKafkaProducerService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        var oauthUser = (org.springframework.security.oauth2.core.user.DefaultOAuth2User) authentication.getPrincipal();

        String email = (String) oauthUser.getAttributes().get("email");
        String name = (String) oauthUser.getAttributes().getOrDefault("name", "Google User");

        // ✅ Save user if not exists
        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User u = User.builder()
                    .email(email)
                    .name(name)
                    .provider("google")
                    .role(Role.ROLE_USER)
                    .build();
            return userRepository.save(u);
        });

        // ✅ Generate JWT
        String token = jwtUtil.generateToken(user.getEmail());

        // ✅ Send Kafka event
        RegisterRequestResponse event = new RegisterRequestResponse();
        event.setUsername(user.getName());
        event.setEmail(user.getEmail());
        event.setBody("🎉 Google login successful! Welcome back, " + user.getName());

        String json = new Gson().toJson(event);
        userKafkaProducerService.sendUserRegistered("Users", json);

        // ✅ Return token in JSON response
        response.setContentType("application/json");
        response.getWriter().write(
                new Gson().toJson(
                        Map.of(
                                "token", token,
                                "message", "Google login successful"
                        )
                )
        );
    }
}
