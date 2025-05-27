package com.example.app.server.entity.models;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.app.server.entity.request.AvailableTimeSlotRequest;
import com.example.app.server.entity.request.SubjectRequest;

import lombok.Data;

@Document(collection = "study_plans")
@Data
public class StudyPlanDocument {
    @Id
    private String id;
    private List<SubjectRequest> subjects;
    private List<AvailableTimeSlotRequest> availableTimeSlots; // MongoDB sẽ tự động chuyển snake_case sang camelCase nếu không có @Field
    private Integer maxConsecutiveHours;
    private Boolean balanceLearningAcrossDays;
    private LocalDateTime createdAt; // Timestamp khi tạo kế hoạch
    // Có thể thêm userId nếu có hệ thống người dùng
    // private String userId;
}
