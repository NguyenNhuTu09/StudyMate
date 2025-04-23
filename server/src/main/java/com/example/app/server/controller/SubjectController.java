package com.example.app.server.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.app.server.entity.Subject;
import com.example.app.server.service.SubjectService;
import com.example.app.server.utils.JwtUtil;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {

    private final SubjectService subjectService;
    private final JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable String id) {
        return ResponseEntity.ok(subjectService.getSubjectById(id));
    }

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject, 
                                                @RequestHeader(value = "Authorization") String authHeader){
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractClaims(token).get("userId", String.class);
        subject.setUserId(userId);
        Subject created = subjectService.createSubject(subject);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(
            @PathVariable String id,
            @RequestBody Subject subjectRequest,
            @RequestHeader(value = "Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String currentUserId = jwtUtil.extractClaims(token).get("userId", String.class);

        Subject updatedSubject = subjectService.updateSubject(id, subjectRequest, currentUserId);
        return ResponseEntity.ok(updatedSubject);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable String id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}
