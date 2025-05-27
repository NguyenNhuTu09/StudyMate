package com.example.app.server.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "studymodules")
public class StudyModules {
    @Id
    private String id;
    private String subjectId;
    private String title;
    private String notes;
    private Boolean isCompleted;
}
