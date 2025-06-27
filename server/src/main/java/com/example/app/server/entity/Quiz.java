package com.example.app.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class Quiz extends StudyModule {
    private List<String> options; // Các lựa chọn
    private int correctAnswerIndex; // Vị trí của câu trả lời đúng
}