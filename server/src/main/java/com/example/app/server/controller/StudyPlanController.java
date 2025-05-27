package com.example.app.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.app.server.entity.Subject;
import com.example.app.server.entity.models.GeneratedStudyPlanResult;
import com.example.app.server.entity.request.StudyPlanRequest;
import com.example.app.server.entity.response.StudyPlanResponse;
import com.example.app.server.service.StudyPlanService;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/study-plans")
public class StudyPlanController {
    @Autowired
    private StudyPlanService studyPlanService;

    @PostMapping("/generate")
    public ResponseEntity<StudyPlanResponse> generateStudyPlan(@RequestBody StudyPlanRequest request) {
        // Validation cơ bản (có thể chi tiết hơn trong thực tế)
        if (request.getSubjects() == null || request.getSubjects().isEmpty()) {
            StudyPlanResponse errorResponse = new StudyPlanResponse();
            errorResponse.setMessage("Vui lòng thêm ít nhất một môn học.");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
        if (request.getAvailable_time_slots() == null || request.getAvailable_time_slots().isEmpty()) {
            StudyPlanResponse errorResponse = new StudyPlanResponse();
            errorResponse.setMessage("Vui lòng thêm ít nhất một khung giờ khả dụng.");
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

        // Gọi service để xử lý
        StudyPlanResponse response = studyPlanService.generateAndSaveStudyPlan(request);

        // Kiểm tra xem service có trả về lỗi hay không
        if (response.getSchedule() == null || response.getSchedule().isEmpty()) {
            // Nếu schedule rỗng hoặc null, giả định đây là một phản hồi lỗi từ service
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST); // Trả về BAD_REQUEST nếu là lỗi nghiệp vụ
        } else {
            return new ResponseEntity<>(response, HttpStatus.OK); // Trả về OK nếu thành công
        }
    }
    @GetMapping(("/all"))
    public ResponseEntity<List<GeneratedStudyPlanResult>> getAllSubjects() {
        return ResponseEntity.ok(studyPlanService.getAllGeneratedStudyPlanResults());
    }

}
