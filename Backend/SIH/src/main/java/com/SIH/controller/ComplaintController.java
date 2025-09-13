package com.SIH.controller;

import com.SIH.config.JwtUtil;
import com.SIH.model.Complaint;
import com.SIH.model.ComplaintStatus;
import com.SIH.service.ComplaintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/complaints")
@RequiredArgsConstructor
public class ComplaintController {

    private final ComplaintService complaintService;
    private final JwtUtil jwtUtil;

    // ✅ File a complaint
    @PostMapping
    public ResponseEntity<?> fileComplaint(@RequestBody Map<String, String> body, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String userEmail = jwtUtil.extractEmail(token);

        Complaint complaint = complaintService.createComplaint(
                body.get("title"),
                body.get("description"),
                body.get("category"),
                userEmail
        );
        return ResponseEntity.ok(Map.of("message", "Complaint filed successfully!", "id", complaint.getId()));
    }

    // ✅ Get all complaints for logged-in user
    @GetMapping("/my")
    public List<Complaint> myComplaints(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String userEmail = jwtUtil.extractEmail(token);
        return complaintService.getUserComplaints(userEmail);
    }

    // ✅ Admin: update status
    @PutMapping("/{id}/status")
    public Complaint updateStatus(@PathVariable Long id, @RequestParam ComplaintStatus status) {
        return complaintService.updateStatus(id, status);
    }

    // ✅ Admin: get all complaints
    @GetMapping
    public List<Complaint> getAll() {
        return complaintService.getAllComplaints();
    }
}
