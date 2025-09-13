package com.SIH.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;   // e.g., Cyber Fraud, Identity Theft, etc.

    @Enumerated(EnumType.STRING)
    private ComplaintStatus status;

    private String filedBy;   // email/username of user

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
