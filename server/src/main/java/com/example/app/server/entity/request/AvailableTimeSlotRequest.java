package com.example.app.server.entity.request;

import lombok.Data;

@Data
public class AvailableTimeSlotRequest {
    private Integer day_of_week; // 0=Sunday, 1=Monday, ..., 6=Saturday
    private String start_time; // HH:MM:SS
    private String end_time;   // HH:MM:SS
}
