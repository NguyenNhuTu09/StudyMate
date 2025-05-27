package com.example.app.server.entity.models;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.app.server.entity.response.ScheduledSession;

import lombok.Data;

@Document(collection = "generated_study_plans")
@Data
public class GeneratedStudyPlanResult {
    @Id
    private String id;
    private String studyPlanRequestId; // Liên kết với StudyPlanDocument gốc
    private List<ScheduledSession> schedule;
    private Double totalPriorityScore;
    private Map<String, Double> dailyHoursBreakdown;
    private String message;
    private LocalDateTime generatedAt;
}
