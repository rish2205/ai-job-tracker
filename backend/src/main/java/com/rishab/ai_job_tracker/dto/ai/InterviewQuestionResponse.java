package com.rishab.ai_job_tracker.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewQuestionResponse {

    private List<String> technicalQuestions;

    private List<String> projectQuestions;

    private List<String> behavioralQuestions;
}
