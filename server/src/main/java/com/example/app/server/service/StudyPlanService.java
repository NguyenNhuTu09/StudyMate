package com.example.app.server.service;

import com.example.app.server.entity.request.StudyPlanRequest;
import com.example.app.server.entity.response.AIResponse;
import com.example.app.server.entity.response.StudyPlanResponse;
import com.example.app.server.entity.Subject;
import com.example.app.server.entity.models.GeneratedStudyPlanResult;
import com.example.app.server.entity.models.StudyPlanDocument;
import com.example.app.server.repository.GeneratedStudyPlanResultRepository;
import com.example.app.server.repository.StudyPlanRepository;

import reactor.core.publisher.Mono;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class StudyPlanService {
    private final StudyPlanRepository studyPlanRepository;
    private final GeneratedStudyPlanResultRepository generatedStudyPlanResultRepository;
    private final WebClient webClient; // Thêm WebClient
    private final ObjectMapper objectMapper;

    // Sử dụng constructor injection để tiêm các dependency
    public StudyPlanService(StudyPlanRepository studyPlanRepository,
                             GeneratedStudyPlanResultRepository generatedStudyPlanResultRepository,
                             WebClient.Builder webClientBuilder, ObjectMapper objectMapper) { // Tiêm WebClient.Builder
        this.studyPlanRepository = studyPlanRepository;
        this.generatedStudyPlanResultRepository = generatedStudyPlanResultRepository;
        // Khởi tạo WebClient với base URL của AI Service
        this.webClient = webClientBuilder.baseUrl("http://127.0.0.1:8000/api/v1").build();
        this.objectMapper = objectMapper;
    }

    public StudyPlanResponse generateAndSaveStudyPlan(StudyPlanRequest request) {
        // 1. Lưu trữ request gốc vào MongoDB (tùy chọn, bạn có thể không cần lưu request gốc nếu chỉ quan tâm kết quả AI)
        StudyPlanDocument studyPlanDoc = new StudyPlanDocument();
        // Ánh xạ các trường từ request vào studyPlanDoc (lưu ý: bạn cần ánh xạ thủ công hoặc dùng ModelMapper/MapStruct)
        studyPlanDoc.setSubjects(request.getSubjects());
        studyPlanDoc.setAvailableTimeSlots(request.getAvailable_time_slots());
        studyPlanDoc.setMaxConsecutiveHours(request.getMax_consecutive_hours());
        studyPlanDoc.setBalanceLearningAcrossDays(request.getBalance_learning_across_days());
        studyPlanDoc.setCreatedAt(LocalDateTime.now());
        studyPlanDoc = studyPlanRepository.save(studyPlanDoc); // Lưu và nhận lại document với ID

        // 2. Gọi AI Service để tạo lịch
        AIResponse aiResponse;
        try {
            // Thực hiện POST request tới AI Service
            String requestBodyJson = objectMapper.writeValueAsString(request);
            System.out.println("Sending to AI Service: " + requestBodyJson); // In ra JSON bạn đang gửi
            aiResponse = webClient.post()
                                  .uri("/generate-schedule") // Chỉ phần URI còn lại sau base URL
                                  .body(Mono.just(request), StudyPlanRequest.class) // Gửi request của frontend đến AI
                                  .retrieve() // Lấy phản hồi
                                  .bodyToMono(AIResponse.class) // Ánh xạ phản hồi về AIResponse DTO
                                  .block(); // Chặn luồng cho đến khi nhận được phản hồi (thận trọng khi dùng block() trong môi trường production, xem xét Reactive nếu app hoàn toàn Reactive)

            if (aiResponse == null || aiResponse.getSchedule() == null) {
                // Xử lý trường hợp AI Service trả về null hoặc không có schedule
                
                throw new RuntimeException("AI Service returned an invalid or empty schedule.");
            }

        } catch (WebClientResponseException e) {
            // Xử lý lỗi từ AI Service (ví dụ: AI trả về 4xx, 5xx)
            String errorMessage = e.getResponseBodyAsString();
            System.err.println("Error from AI Service: " + e.getStatusCode() + " - " + errorMessage);
            // Trả về lỗi cho frontend
            StudyPlanResponse errorResponse = new StudyPlanResponse();
            errorResponse.setMessage("Failed to generate plan from AI Service: " + errorMessage);
            // Bạn có thể set schedule, total_priority_score, daily_hours_breakdown là null hoặc rỗng
            errorResponse.setSchedule(List.of());
            errorResponse.setDaily_hours_breakdown(Map.of());
            errorResponse.setTotal_priority_score(0.0);
            return errorResponse; // Trả về phản hồi lỗi cho frontend
        } catch (Exception e) {
            // Xử lý các lỗi khác (ví dụ: lỗi kết nối mạng)
            System.err.println("Error connecting to AI Service: " + e.getMessage());
            StudyPlanResponse errorResponse = new StudyPlanResponse();
            errorResponse.setMessage("Failed to connect to AI Service: " + e.getMessage());
            errorResponse.setSchedule(List.of());
            errorResponse.setDaily_hours_breakdown(Map.of());
            errorResponse.setTotal_priority_score(0.0);
            return errorResponse; // Trả về phản hồi lỗi cho frontend
        } 

        // 3. Chuẩn bị phản hồi cho Frontend từ kết quả của AI Service
        StudyPlanResponse response = new StudyPlanResponse();
        response.setSchedule(aiResponse.getSchedule());
        response.setTotal_priority_score(aiResponse.getTotal_priority_score());
        response.setDaily_hours_breakdown(aiResponse.getDaily_hours_breakdown());
        response.setMessage(aiResponse.getMessage() != null ? aiResponse.getMessage() : "Lịch học đã được tạo thành công.");

        // 4. Lưu kết quả lịch học đã tạo (từ AI Service) vào MongoDB
        GeneratedStudyPlanResult generatedResult = new GeneratedStudyPlanResult();
        generatedResult.setStudyPlanRequestId(studyPlanDoc.getId()); // Liên kết với request gốc
        generatedResult.setSchedule(aiResponse.getSchedule());
        generatedResult.setTotalPriorityScore(aiResponse.getTotal_priority_score());
        generatedResult.setDailyHoursBreakdown(aiResponse.getDaily_hours_breakdown());
        generatedResult.setMessage(aiResponse.getMessage());
        generatedResult.setGeneratedAt(LocalDateTime.now());
        generatedStudyPlanResultRepository.save(generatedResult);

        return response; // Trả về phản hồi thành công
    }

    public List<GeneratedStudyPlanResult> getAllGeneratedStudyPlanResults() {
        return generatedStudyPlanResultRepository.findAll();
    }
}
