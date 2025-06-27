package com.example.app.server.service.serviceImpl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import com.example.app.server.service.ProgressService;
import com.example.app.server.service.Inteface.StudyEventListener;
import com.example.app.server.service.event.StudyEvent;

@Component
@RequiredArgsConstructor
public class ProgressUpdaterListener implements StudyEventListener {
    private final ProgressService progressService;

    @Override
    public void onStudyEvent(StudyEvent event) {
        // Lắng nghe các sự kiện và cập nhật tiến độ tương ứng
        progressService.updateProgress(event.getUserId(), event.getSubjectId());
    }
}
