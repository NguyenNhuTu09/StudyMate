package com.example.app.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "progress")
public class Progress {
    @Id
    private String id;
    private String userId;
    private String subjectId;
    private Long totalModules;
    private Long completedModules;
    private double completionRate;
}