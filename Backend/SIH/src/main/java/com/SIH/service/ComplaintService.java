package com.SIH.service;

import com.SIH.model.Complaint;
import com.SIH.model.ComplaintStatus;
import com.SIH.repository.ComplaintRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserKafkaProducerService kafkaProducerService;

    public Complaint createComplaint(String title, String description, String category, String userEmail) {
        Complaint complaint = Complaint.builder()
                .title(title)
                .description(description)
                .category(category)
                .filedBy(userEmail)
                .status(ComplaintStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Complaint saved = complaintRepository.save(complaint);

        // Send event to Kafka
        kafkaProducerService.sendUserRegistered(
                "complaint",
                "{ \"id\": " + saved.getId() +
                        ", \"user\": \"" + userEmail +
                        "\", \"title\": \"" + title + "\" }"
        );

        return saved;
    }

    public List<Complaint> getUserComplaints(String email) {
        return complaintRepository.findByFiledBy(email);
    }

    public Complaint updateStatus(Long id, ComplaintStatus status) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status);
        complaint.setUpdatedAt(LocalDateTime.now());
        return complaintRepository.save(complaint);
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }
}
