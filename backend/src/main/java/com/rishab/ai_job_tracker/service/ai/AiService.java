package com.rishab.ai_job_tracker.service.ai;

import com.rishab.ai_job_tracker.dto.ai.InterviewQuestionResponse;
import com.rishab.ai_job_tracker.dto.ai.JobAnalysisResponse;
import com.rishab.ai_job_tracker.dto.ai.ResumeMatchResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.rishab.ai_job_tracker.dto.ai.ApplicationAdviceResponse;

@Service
@RequiredArgsConstructor
public class AiService {

    private final AiClient aiClient;

    public JobAnalysisResponse analyzeJobDescription(
            String jobDescription) {

        return aiClient.analyzeJobDescription(jobDescription);
    }

    public ResumeMatchResponse matchResume(
        String resumeText,
        String jobDescription) {

    return aiClient.matchResume(
            resumeText,
            jobDescription
    );
}

public InterviewQuestionResponse generateInterviewQuestions(
        String jobTitle,
        String companyName,
        String jobDescription) {

    return aiClient.generateInterviewQuestions(
            jobTitle,
            companyName,
            jobDescription
    );
}

public ApplicationAdviceResponse getApplicationAdvice(
        String companyName,
        String jobTitle,
        String status,
        String jobDescription,
        String notes) {

    return aiClient.getApplicationAdvice(
            companyName,
            jobTitle,
            status,
            jobDescription,
            notes
    );
}
}
