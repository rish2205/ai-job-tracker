package com.rishab.ai_job_tracker.controller;

import com.rishab.ai_job_tracker.dto.auth.LoginRequest;
import com.rishab.ai_job_tracker.dto.auth.LoginResponse;
import com.rishab.ai_job_tracker.dto.auth.RegisterRequest;
import com.rishab.ai_job_tracker.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(
            @Valid @RequestBody RegisterRequest request) {

        authService.register(request);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }
}