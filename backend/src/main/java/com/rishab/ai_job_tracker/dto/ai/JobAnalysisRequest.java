package com.rishab.ai_job_tracker.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobAnalysisRequest {

    @NotBlank(message = "Job description is required")
    private String jobDescription;
}