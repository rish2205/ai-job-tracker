package com.rishab.ai_job_tracker.service;

import com.rishab.ai_job_tracker.dto.job.JobApplicationPageResponse;
import com.rishab.ai_job_tracker.dto.job.JobApplicationRequest;
import com.rishab.ai_job_tracker.dto.job.JobApplicationResponse;
import com.rishab.ai_job_tracker.entity.ApplicationStatus;
import com.rishab.ai_job_tracker.entity.JobApplication;
import com.rishab.ai_job_tracker.entity.User;
import com.rishab.ai_job_tracker.exception.ResourceNotFoundException;
import com.rishab.ai_job_tracker.repository.JobApplicationRepository;
import com.rishab.ai_job_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public JobApplicationResponse createJob(
            JobApplicationRequest request) {

        User user = getCurrentUser();

        log.info("Creating job application for user: {}",
                user.getEmail());

        JobApplication job = JobApplication.builder()
                .companyName(request.getCompanyName())
                .jobTitle(request.getJobTitle())
                .location(request.getLocation())
                .salary(request.getSalary())
                .jobDescription(request.getJobDescription())
                .status(request.getStatus())
                .applicationDate(request.getApplicationDate())
                .notes(request.getNotes())
                .user(user)
                .build();

        JobApplication savedJob =
                jobApplicationRepository.save(job);

        log.info("Job application created successfully. id: {}",
                savedJob.getId());

        return mapToResponse(savedJob);
    }

    public JobApplicationResponse getJobById(Long id) {

        User user = getCurrentUser();

        log.info("Fetching job application. id: {}, user: {}",
                id,
                user.getEmail());

        JobApplication job =
                jobApplicationRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() -> {

                            log.warn(
                                    "Job application not found. id: {}, user: {}",
                                    id,
                                    user.getEmail()
                            );

                            return new ResourceNotFoundException(
                                    "Job application not found"
                            );
                        });

        return mapToResponse(job);
    }

    public JobApplicationResponse updateJob(
            Long id,
            JobApplicationRequest request) {

        User user = getCurrentUser();

        log.info("Updating job application. id: {}, user: {}",
                id,
                user.getEmail());

        JobApplication job =
                jobApplicationRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() -> {

                            log.warn(
                                    "Cannot update. Job application not found. id: {}, user: {}",
                                    id,
                                    user.getEmail()
                            );

                            return new ResourceNotFoundException(
                                    "Job application not found"
                            );
                        });

        job.setCompanyName(request.getCompanyName());
        job.setJobTitle(request.getJobTitle());
        job.setLocation(request.getLocation());
        job.setSalary(request.getSalary());
        job.setJobDescription(request.getJobDescription());
        job.setStatus(request.getStatus());
        job.setApplicationDate(request.getApplicationDate());
        job.setNotes(request.getNotes());

        JobApplication updatedJob =
                jobApplicationRepository.save(job);

        log.info("Job application updated successfully. id: {}",
                updatedJob.getId());

        return mapToResponse(updatedJob);
    }

    public void deleteJob(Long id) {

        User user = getCurrentUser();

        log.info("Deleting job application. id: {}, user: {}",
                id,
                user.getEmail());

        JobApplication job =
                jobApplicationRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() -> {

                            log.warn(
                                    "Cannot delete. Job application not found. id: {}, user: {}",
                                    id,
                                    user.getEmail()
                            );

                            return new ResourceNotFoundException(
                                    "Job application not found"
                            );
                        });

        jobApplicationRepository.delete(job);

        log.info("Job application deleted successfully. id: {}",
                id);
    }

    public JobApplicationPageResponse searchJobs(
            ApplicationStatus status,
            String company,
            Pageable pageable) {

        User user = getCurrentUser();

        log.info(
                "Searching jobs. user: {}, status: {}, company: {}, page: {}, size: {}",
                user.getEmail(),
                status,
                company,
                pageable.getPageNumber(),
                pageable.getPageSize()
        );

        Page<JobApplication> jobs;

        if (status != null &&
                company != null &&
                !company.isBlank()) {

            jobs = jobApplicationRepository
                    .findByUserAndStatusAndCompanyNameContainingIgnoreCase(
                            user,
                            status,
                            company,
                            pageable
                    );

        } else if (status != null) {

            jobs = jobApplicationRepository
                    .findByUserAndStatus(
                            user,
                            status,
                            pageable
                    );

        } else if (company != null &&
                !company.isBlank()) {

            jobs = jobApplicationRepository
                    .findByUserAndCompanyNameContainingIgnoreCase(
                            user,
                            company,
                            pageable
                    );

        } else {

            jobs = jobApplicationRepository
                    .findByUser(
                            user,
                            pageable
                    );
        }

        log.info(
                "Job search completed. user: {}, returned: {}, total: {}",
                user.getEmail(),
                jobs.getNumberOfElements(),
                jobs.getTotalElements()
        );

        List<JobApplicationResponse> content =
                jobs.getContent()
                        .stream()
                        .map(this::mapToResponse)
                        .toList();

        return JobApplicationPageResponse.builder()
                .content(content)
                .page(jobs.getNumber())
                .size(jobs.getSize())
                .totalElements(jobs.getTotalElements())
                .totalPages(jobs.getTotalPages())
                .last(jobs.isLast())
                .build();
    }

    private User getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> {

                    log.error(
                            "Authenticated user could not be found in database: {}",
                            email
                    );

                    return new ResourceNotFoundException(
                            "User not found"
                    );
                });
    }

    private JobApplicationResponse mapToResponse(
            JobApplication job) {

        return JobApplicationResponse.builder()
                .id(job.getId())
                .companyName(job.getCompanyName())
                .jobTitle(job.getJobTitle())
                .location(job.getLocation())
                .salary(job.getSalary())
                .jobDescription(job.getJobDescription())
                .status(job.getStatus())
                .applicationDate(job.getApplicationDate())
                .notes(job.getNotes())
                .build();
    }
}