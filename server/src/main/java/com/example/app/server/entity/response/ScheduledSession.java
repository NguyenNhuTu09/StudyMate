package com.example.app.server.entity.response;

import lombok.Data;

@Data
public class ScheduledSession {
    private String subject_name;
    private Integer day_of_week;
    private String start_time;
    private String end_time;
}
