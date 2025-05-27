package com.example.app.server.entity.response;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AIResponse {
    private List<ScheduledSession> schedule;
    private Double total_priority_score;
    private Map<String, Double> daily_hours_breakdown;
    private String message; // Trường message từ AI Service
}
