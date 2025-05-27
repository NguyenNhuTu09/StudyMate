package com.example.app.server.entity.request;

import java.util.List;

import lombok.Data;

@Data
public class SubjectRequest {
    private String name;
    private Integer estimated_hours;
    private Integer priority; // 1-5
    private String preferred_time_of_day; // "morning", "afternoon", "evening", "any"
    private Integer min_sessions;
    private Integer max_sessions;
    private List<Integer> avoid_days; // 0=Sunday, 1=Monday, ..., 6=Saturday
}