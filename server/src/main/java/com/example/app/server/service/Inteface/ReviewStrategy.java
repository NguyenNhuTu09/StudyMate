package com.example.app.server.service.Inteface;

import com.example.app.server.entity.StudyModule;
import java.util.List;

public interface ReviewStrategy {
    List<StudyModule> selectModulesForReview(List<StudyModule> allModules);
    List<StudyModule> getReviewPlan(List<StudyModule> allModules);
}