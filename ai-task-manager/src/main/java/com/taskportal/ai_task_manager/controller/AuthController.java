package com.taskportal.ai_task_manager.controller;


import com.taskportal.ai_task_manager.dto.AuthResponse;
import com.taskportal.ai_task_manager.dto.LoginRequest;
import com.taskportal.ai_task_manager.dto.RegisterRequest;
import com.taskportal.ai_task_manager.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request) {

        return authService.login(request);
    }
}
