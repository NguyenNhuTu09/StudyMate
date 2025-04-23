package com.example.app.server.service;

import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.example.app.server.entity.Subject;
import com.example.app.server.repository.SubjectRepository;
import com.example.app.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubjectService {
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject getSubjectById(String id) {
        return subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));
    }

    public Subject createSubject(Subject subject){
        if(subject.getName() == null || subject.getName().isBlank()){
            throw new IllegalArgumentException("Subject name must not be emtpty");
        }

        if (subjectRepository.existsByName(subject.getName())) {
            throw new IllegalArgumentException("Subject with the same name already exists");
        }

        try {
            return subjectRepository.save(subject);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Failed to save subject due to constraint violation", e);
        }
    }

    public Subject updateSubject(String id, Subject subjectRequest, String currentUserId) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + id));
        
        if (!subject.getUserId().equals(currentUserId)) {
            throw new AccessDeniedException("You are not allowed to update this subject");
        }
    
        if (subjectRequest.getName() == null || subjectRequest.getName().isBlank()) {
            throw new IllegalArgumentException("Subject name must not be empty");
        }
        subject.setName(subjectRequest.getName());
        subject.setDescription(subjectRequest.getDescription());

        return subjectRepository.save(subject);
    }

    public void deleteSubject(String id) {
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found with ID: " + id));
        subjectRepository.delete(subject);
    }

    public List<Subject> getSubjectsByUserId(String userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        return subjectRepository.findByUserId(userId);
    }
}
