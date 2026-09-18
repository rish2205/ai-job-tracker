package com.rishab.ai_job_tracker.controller;

import com.rishab.ai_job_tracker.dto.ai.JobAnalysisRequest;
import com.rishab.ai_job_tracker.dto.ai.JobAnalysisResponse;
import com.rishab.ai_job_tracker.dto.ai.ResumeMatchRequest;
import com.rishab.ai_job_tracker.dto.ai.ResumeMatchResponse;
import com.rishab.ai_job_tracker.service.ai.AiService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rishab.ai_job_tracker.dto.ai.InterviewQuestionRequest;
import com.rishab.ai_job_tracker.dto.ai.InterviewQuestionResponse;
import com.rishab.ai_job_tracker.dto.ai.ApplicationAdviceRequest;
import com.rishab.ai_job_tracker.dto.ai.ApplicationAdviceResponse;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/analyze-job")
    public ResponseEntity<JobAnalysisResponse> analyzeJob(
            @Valid @RequestBody JobAnalysisRequest request) {

        JobAnalysisResponse response =
                aiService.analyzeJobDescription(
                        request.getJobDescription()
                );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/match-resume")
public ResponseEntity<ResumeMatchResponse> matchResume(
        @Valid @RequestBody ResumeMatchRequest request) {

    ResumeMatchResponse response =
            aiService.matchResume(
                    request.getResumeText(),
                    request.getJobDescription()
            );

    return ResponseEntity.ok(response);
}

@PostMapping("/interview-questions")
public ResponseEntity<InterviewQuestionResponse> generateInterviewQuestions(
        @Valid @RequestBody InterviewQuestionRequest request) {

    InterviewQuestionResponse response =
            aiService.generateInterviewQuestions(
                    request.getJobTitle(),
                    request.getCompanyName(),
                    request.getJobDescription()
            );

    return ResponseEntity.ok(response);
}

@PostMapping("/application-advice")
public ResponseEntity<ApplicationAdviceResponse> getApplicationAdvice(
        @Valid @RequestBody ApplicationAdviceRequest request) {

    ApplicationAdviceResponse response =
            aiService.getApplicationAdvice(
                    request.getCompanyName(),
                    request.getJobTitle(),
                    request.getStatus(),
                    request.getJobDescription(),
                    request.getNotes()
            );

    return ResponseEntity.ok(response);
}
}
