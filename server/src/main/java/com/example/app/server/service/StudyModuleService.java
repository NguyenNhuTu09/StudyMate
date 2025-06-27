package com.example.app.server.service;

import com.example.app.server.Factory.StudyModuleFactory;
import com.example.app.server.entity.StudyModule;
import com.example.app.server.entity.dto.StudyModuleDTO;
import com.example.app.server.repository.StudyModuleRepository;
import com.example.app.server.service.Inteface.ReviewStrategy;
import com.example.app.server.service.Inteface.StudyEventListener;
import com.example.app.server.service.event.StudyEvent;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudyModuleService {

    private final StudyModuleRepository moduleRepository;
    private final List<StudyEventListener> listeners; // Spring inject tất cả Observers

    // Publisher method
    private void publishEvent(String userId, String subjectId, StudyEvent.EventType type) {
        StudyEvent event = new StudyEvent(userId, subjectId, type);
        listeners.forEach(listener -> listener.onStudyEvent(event));
    }

    public StudyModule createModule(String subjectId, StudyModuleDTO dto, String userId) {
        StudyModule module = StudyModuleFactory.createModule(dto);
        module.setSubjectId(subjectId);
        module.setQuestion(dto.getQuestion());

        StudyModule savedModule = moduleRepository.save(module);
        
        // Publish event
        publishEvent(userId, subjectId, StudyEvent.EventType.MODULE_CREATED);
        
        return savedModule;
    }

    public List<StudyModule> getModulesForSubject(String subjectId) {
        return moduleRepository.findBySubjectId(subjectId);
    }
    
    public List<StudyModule> getReviewSession(String subjectId, ReviewStrategy strategy) {
        List<StudyModule> allModules = moduleRepository.findBySubjectId(subjectId);
        return strategy.getReviewPlan(allModules);
    }
    
    // Thêm các hàm update, delete và publish event tương ứng
}
