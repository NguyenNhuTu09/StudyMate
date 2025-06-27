package com.example.app.server.service.serviceImpl;

import com.example.app.server.entity.StudyModule;
import com.example.app.server.service.Inteface.ReviewStrategy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RandomReviewStrategy implements ReviewStrategy {
    @Override
    public List<StudyModule> selectModulesForReview(List<StudyModule> allModules) {
        Collections.shuffle(allModules);
        return allModules;
    }
    @Override
    public List<StudyModule> getReviewPlan(List<StudyModule> allModules) {
        List<StudyModule> shuffledList = new ArrayList<>(allModules);
        Collections.shuffle(shuffledList);
        return shuffledList;
    }
}