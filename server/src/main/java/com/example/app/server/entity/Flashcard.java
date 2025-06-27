package com.example.app.server.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class Flashcard extends StudyModule {
    private String answer; // Mặt sau của flashcard
}