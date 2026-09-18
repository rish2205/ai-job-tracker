package com.rishab.ai_job_tracker.dto.job;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class DashboardResponse {

    private long totalApplications;
    private long applied;
    private long assessments;
    private long interviews;
    private long offers;
    private long rejections;
}