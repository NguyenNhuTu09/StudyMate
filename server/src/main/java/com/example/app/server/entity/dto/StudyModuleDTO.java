package com.example.app.server.entity.dto;

import java.util.List;

import lombok.Data;

@Data
public class StudyModuleDTO {
    private String type; // "FLASHCARD" hoặc "QUIZ"
    private String question;
    // Thuộc tính riêng cho Flashcard
    private String answer;
    // Thuộc tính riêng cho Quiz
    private List<String> options;
    private int correctAnswerIndex;
}
