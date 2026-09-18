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
public class ResumeMatchResponse {

    private int matchScore;

    private List<String> matchingSkills;

    private List<String> missingSkills;

    private List<String> suggestions;
}
