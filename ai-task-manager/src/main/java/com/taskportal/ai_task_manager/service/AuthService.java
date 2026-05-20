package com.taskportal.ai_task_manager.service;


import com.taskportal.ai_task_manager.dto.AuthResponse;
import com.taskportal.ai_task_manager.dto.LoginRequest;
import com.taskportal.ai_task_manager.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}