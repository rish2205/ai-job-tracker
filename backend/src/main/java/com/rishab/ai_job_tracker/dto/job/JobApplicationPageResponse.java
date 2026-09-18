package com.rishab.ai_job_tracker.dto.job;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
@Builder
public class JobApplicationPageResponse {

    private List<JobApplicationResponse> content;
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private boolean last;
}