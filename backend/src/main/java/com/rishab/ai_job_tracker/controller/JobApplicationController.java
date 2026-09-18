package com.rishab.ai_job_tracker.controller;

import com.rishab.ai_job_tracker.dto.job.JobApplicationPageResponse;
import com.rishab.ai_job_tracker.dto.job.JobApplicationRequest;
import com.rishab.ai_job_tracker.dto.job.JobApplicationResponse;
import com.rishab.ai_job_tracker.entity.ApplicationStatus;
import com.rishab.ai_job_tracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponse> createJob(
            @Valid @RequestBody JobApplicationRequest request) {

        return ResponseEntity.ok(
                jobApplicationService.createJob(request)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getJob(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                jobApplicationService.getJobById(id)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request) {

        return ResponseEntity.ok(
                jobApplicationService.updateJob(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable Long id) {

        jobApplicationService.deleteJob(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<JobApplicationPageResponse> searchJobs(
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(required = false) String company,
            Pageable pageable) {

        return ResponseEntity.ok(
                jobApplicationService.searchJobs(
                        status,
                        company,
                        pageable
                )
        );
    }
}