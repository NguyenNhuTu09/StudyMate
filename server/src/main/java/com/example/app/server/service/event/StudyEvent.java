package com.example.app.server.service.event;

import lombok.Getter;

@Getter
public class StudyEvent {
    public enum EventType { MODULE_CREATED, MODULE_COMPLETED, MODULE_DELETED }
    private final String userId;
    private final String subjectId;
    private final EventType type;

    public StudyEvent(String userId, String subjectId, EventType type) {
        this.userId = userId;
        this.subjectId = subjectId;
        this.type = type;
    }

    
}
