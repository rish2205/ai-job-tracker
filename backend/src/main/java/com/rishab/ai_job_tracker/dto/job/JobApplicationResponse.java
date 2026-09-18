package com.rishab.ai_job_tracker.dto.job;

import com.rishab.ai_job_tracker.entity.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
@Builder
public class JobApplicationResponse {

    private Long id;
    private String companyName;
    private String jobTitle;
    private String location;
    private BigDecimal salary;
    private String jobDescription;
    private ApplicationStatus status;
    private LocalDate applicationDate;
    private String notes;
}