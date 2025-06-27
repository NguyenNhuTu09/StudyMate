package com.example.app.server.service;

import com.example.app.server.entity.Progress;
import com.example.app.server.repository.ProgressRepository;
import com.example.app.server.repository.StudyModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final ProgressRepository progressRepository;
    private final StudyModuleRepository moduleRepository;

    public void updateProgress(String userId, String subjectId) {
        Progress progress = progressRepository.findByUserIdAndSubjectId(userId, subjectId)
                .orElse(new Progress());
        progress.setUserId(userId);
        progress.setSubjectId(subjectId);

        long totalModules = moduleRepository.countBySubjectId(subjectId);
        // Giả sử có 1 trường `isCompleted` trong StudyModule để đếm
        // long completedModules = moduleRepository.countBySubjectIdAndIsCompleted(subjectId, true);
        long completedModules = 0; // Placeholder logic

        progress.setTotalModules(totalModules);
        progress.setCompletedModules(completedModules);
        if (totalModules > 0) {
            progress.setCompletionRate((double) completedModules / totalModules * 100);
        } else {
            progress.setCompletionRate(0);
        }
        progressRepository.save(progress);
    }
}
