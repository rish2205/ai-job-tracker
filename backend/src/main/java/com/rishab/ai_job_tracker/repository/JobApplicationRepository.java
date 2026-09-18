package com.rishab.ai_job_tracker.repository;

import com.rishab.ai_job_tracker.entity.ApplicationStatus;
import com.rishab.ai_job_tracker.entity.JobApplication;
import com.rishab.ai_job_tracker.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobApplicationRepository
        extends JpaRepository<JobApplication, Long> {

    Page<JobApplication> findByUser(
            User user,
            Pageable pageable
    );

    Page<JobApplication> findByUserAndStatus(
            User user,
            ApplicationStatus status,
            Pageable pageable
    );

    Page<JobApplication> findByUserAndCompanyNameContainingIgnoreCase(
            User user,
            String company,
            Pageable pageable
    );

    Page<JobApplication> findByUserAndStatusAndCompanyNameContainingIgnoreCase(
            User user,
            ApplicationStatus status,
            String company,
            Pageable pageable
    );

    List<JobApplication> findAllByUser(User user);

    Optional<JobApplication> findByIdAndUser(
            Long id,
            User user
    );
}