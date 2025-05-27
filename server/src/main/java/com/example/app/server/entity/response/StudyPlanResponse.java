package com.example.app.server.entity.response;

import lombok.Data;
import java.util.Map;
import java.util.List;

@Data
public class StudyPlanResponse {
    private List<ScheduledSession> schedule;
    private Double total_priority_score; // Sử dụng Double cho giá trị thập phân
    private Map<String, Double> daily_hours_breakdown; // Key là String (ví dụ "0", "1", ...)
    private String message;
}
