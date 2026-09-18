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
public class ApplicationAdviceResponse {

    private String summary;

    private String priority;

    private List<String> nextActions;

    private List<String> preparationTips;
}