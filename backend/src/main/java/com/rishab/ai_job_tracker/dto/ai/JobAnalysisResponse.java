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
public class JobAnalysisResponse {

    private String role;

    private List<String> requiredSkills;

    private List<String> preferredSkills;

    private List<String> technologies;

    private String experience;
}