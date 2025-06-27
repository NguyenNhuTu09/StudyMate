package com.example.app.server.controller;

import com.example.app.server.entity.StudyModule;
import com.example.app.server.entity.dto.StudyModuleDTO;
import com.example.app.server.service.StudyModuleService;
import com.example.app.server.service.serviceImpl.RandomReviewStrategy;
import com.example.app.server.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/subjects/{subjectId}/modules")
@RequiredArgsConstructor
public class StudyModuleController {

    private final StudyModuleService moduleService;
    private final JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<StudyModule> createModule(@PathVariable String subjectId, @RequestBody StudyModuleDTO dto, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractClaims(token).get("userId", String.class);
        
        StudyModule createdModule = moduleService.createModule(subjectId, dto, userId);
        return ResponseEntity.ok(createdModule);
    }

    @GetMapping
    public ResponseEntity<List<StudyModule>> getModules(@PathVariable String subjectId) {
        return ResponseEntity.ok(moduleService.getModulesForSubject(subjectId));
    }
    
    @GetMapping("/review")
    public ResponseEntity<List<StudyModule>> getReviewSession(@PathVariable String subjectId) {
        // Hiện tại mặc định dùng Random, sau này có thể truyền `strategyType` từ client
        List<StudyModule> reviewList = moduleService.getReviewSession(subjectId, new RandomReviewStrategy());
        return ResponseEntity.ok(reviewList);
    }
}
