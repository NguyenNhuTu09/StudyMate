package com.example.app.server.service.Inteface;

import com.example.app.server.service.event.StudyEvent;

public interface StudyEventListener {
    void onStudyEvent(StudyEvent event);
}
