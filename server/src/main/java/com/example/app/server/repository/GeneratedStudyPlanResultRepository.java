package com.example.app.server.repository;

import com.example.app.server.entity.models.GeneratedStudyPlanResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneratedStudyPlanResultRepository extends MongoRepository<GeneratedStudyPlanResult, String> {
    // Có thể tìm kiếm theo studyPlanRequestId nếu muốn
    // List<GeneratedStudyPlanResult> findByStudyPlanRequestId(String requestId);
}
