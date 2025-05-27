package com.example.app.server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.app.server.entity.models.StudyPlanDocument;

@Repository
public interface StudyPlanRepository extends MongoRepository<StudyPlanDocument, String> {
    // Có thể thêm các phương thức tìm kiếm tùy chỉnh nếu cần
}
