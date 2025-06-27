package com.example.app.server.entity;
// Đây là một entity cha. Chúng ta sẽ dùng Factory Method để tạo các thể hiện con của nó.
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "study_modules")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
    @JsonSubTypes.Type(value = Flashcard.class, name = "FLASHCARD"),
    @JsonSubTypes.Type(value = Quiz.class, name = "QUIZ")
})
public abstract class StudyModule {
    @Id
    private String id;
    private String subjectId; // Thuộc môn học nào
    private String question; // Câu hỏi hoặc mặt trước của flashcard
}