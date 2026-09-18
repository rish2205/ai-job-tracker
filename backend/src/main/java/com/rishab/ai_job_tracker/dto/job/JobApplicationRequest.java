package com.rishab.ai_job_tracker.dto.job;

import com.rishab.ai_job_tracker.entity.ApplicationStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class JobApplicationRequest {

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    private String location;

    private BigDecimal salary;

    private String jobDescription;

    @NotNull(message = "Status is required")
    private ApplicationStatus status;

    private LocalDate applicationDate;

    private String notes;
}
