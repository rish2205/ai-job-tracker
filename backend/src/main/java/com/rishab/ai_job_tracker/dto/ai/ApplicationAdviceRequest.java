package com.rishab.ai_job_tracker.dto.ai;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationAdviceRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Application status is required")
    private String status;

    private String jobDescription;

    private String notes;
}
