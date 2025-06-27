package com.example.app.server.repository;
import com.example.app.server.entity.StudyModule;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface StudyModuleRepository extends MongoRepository<StudyModule, String> {
    List<StudyModule> findBySubjectId(String subjectId);
    long countBySubjectId(String subjectId);
}