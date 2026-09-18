package com.rishab.ai_job_tracker.service;

import com.rishab.ai_job_tracker.dto.job.DashboardResponse;
import com.rishab.ai_job_tracker.entity.ApplicationStatus;
import com.rishab.ai_job_tracker.entity.JobApplication;
import com.rishab.ai_job_tracker.entity.User;
import com.rishab.ai_job_tracker.exception.ResourceNotFoundException;
import com.rishab.ai_job_tracker.repository.JobApplicationRepository;
import com.rishab.ai_job_tracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;

    public DashboardResponse getDashboard() {

        User user = getCurrentUser();

        log.info("Fetching dashboard for user: {}",
                user.getEmail());

        List<JobApplication> jobs =
                jobApplicationRepository.findAllByUser(user);

        long totalApplications = jobs.size();

        long applied = jobs.stream()
                .filter(job ->
                        job.getStatus() == ApplicationStatus.APPLIED)
                .count();

        long assessments = jobs.stream()
                .filter(job ->
                        job.getStatus() == ApplicationStatus.ASSESSMENT)
                .count();

        long interviews = jobs.stream()
                .filter(job ->
                        job.getStatus() == ApplicationStatus.INTERVIEW)
                .count();

        long offers = jobs.stream()
                .filter(job ->
                        job.getStatus() == ApplicationStatus.OFFER)
                .count();

        long rejections = jobs.stream()
                .filter(job ->
                        job.getStatus() == ApplicationStatus.REJECTED)
                .count();

        log.info(
                "Dashboard calculated successfully. user: {}, totalApplications: {}",
                user.getEmail(),
                totalApplications
        );

        return DashboardResponse.builder()
                .totalApplications(totalApplications)
                .applied(applied)
                .assessments(assessments)
                .interviews(interviews)
                .offers(offers)
                .rejections(rejections)
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
}