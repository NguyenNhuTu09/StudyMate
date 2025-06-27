package com.example.app.server.Factory;

import com.example.app.server.entity.Flashcard;
import com.example.app.server.entity.Quiz;
import com.example.app.server.entity.StudyModule;
import com.example.app.server.entity.dto.StudyModuleDTO;

public class StudyModuleFactory {
    public static StudyModule createModule(StudyModuleDTO dto) {
        String type = dto.getType();
        if ("FLASHCARD".equalsIgnoreCase(type)) {
            Flashcard card = new Flashcard();
            card.setAnswer(dto.getAnswer());
            return card;
        } else if ("QUIZ".equalsIgnoreCase(type)) {
            Quiz quiz = new Quiz();
            quiz.setOptions(dto.getOptions());
            quiz.setCorrectAnswerIndex(dto.getCorrectAnswerIndex());
            return quiz;
        }
        throw new IllegalArgumentException("Unknown module type: " + type);
    }
}
