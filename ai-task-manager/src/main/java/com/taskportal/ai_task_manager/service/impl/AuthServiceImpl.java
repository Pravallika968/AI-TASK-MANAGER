package com.taskportal.ai_task_manager.service.impl;

import com.taskportal.ai_task_manager.dto.AuthResponse;
import com.taskportal.ai_task_manager.dto.LoginRequest;
import com.taskportal.ai_task_manager.dto.RegisterRequest;
import com.taskportal.ai_task_manager.entity.User;
import com.taskportal.ai_task_manager.exception.DuplicateResourceException;
import com.taskportal.ai_task_manager.exception.ResourceNotFoundException;
import com.taskportal.ai_task_manager.repository.UserRepository;
import com.taskportal.ai_task_manager.security.JwtUtil;
import com.taskportal.ai_task_manager.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(
                request.getEmail())) {

            throw new DuplicateResourceException(
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

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        // ✅ return token + username
        return new AuthResponse(
                token,
                user.getName()
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid password"
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail()
                );

        // ✅ return token + username
        return new AuthResponse(
                token,
                user.getName()
        );
    }
}