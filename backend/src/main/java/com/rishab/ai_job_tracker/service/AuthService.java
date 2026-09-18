package com.rishab.ai_job_tracker.service;

import com.rishab.ai_job_tracker.dto.auth.LoginRequest;
import com.rishab.ai_job_tracker.dto.auth.LoginResponse;
import com.rishab.ai_job_tracker.dto.auth.RegisterRequest;
import com.rishab.ai_job_tracker.entity.User;
import com.rishab.ai_job_tracker.exception.BadRequestException;
import com.rishab.ai_job_tracker.repository.UserRepository;
import com.rishab.ai_job_tracker.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public void register(RegisterRequest request) {

        log.info("Registration attempt for email: {}",
                request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {

            log.warn("Registration failed. Email already exists: {}",
                    request.getEmail());

            throw new BadRequestException(
                    "Email already exists"
            );
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .build();

        userRepository.save(user);

        log.info("User registered successfully: {}",
                request.getEmail());
    }

    public LoginResponse login(LoginRequest request) {

        log.info("Login attempt for email: {}",
                request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        String token =
                jwtService.generateToken(request.getEmail());

        log.info("Login successful for email: {}",
                request.getEmail());

        return new LoginResponse(token);
    }
}