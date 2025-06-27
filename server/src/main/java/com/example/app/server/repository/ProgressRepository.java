package com.example.app.server.repository;
import com.example.app.server.entity.Progress;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ProgressRepository extends MongoRepository<Progress, String> {
    Optional<Progress> findByUserIdAndSubjectId(String userId, String subjectId);
}