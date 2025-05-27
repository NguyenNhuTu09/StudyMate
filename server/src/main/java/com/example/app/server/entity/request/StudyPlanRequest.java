package com.example.app.server.entity.request;

import java.util.List;

import lombok.Data;

@Data
public class StudyPlanRequest {
    private List<SubjectRequest> subjects;
    private List<AvailableTimeSlotRequest> available_time_slots;
    private Integer max_consecutive_hours;
    private Boolean balance_learning_across_days;
}