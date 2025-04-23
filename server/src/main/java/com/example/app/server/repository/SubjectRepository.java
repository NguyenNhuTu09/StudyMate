package com.example.app.server.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.app.server.entity.Subject;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    boolean existsByName(String name); 
    List<Subject> findByUserId(String userId);
} 