package com.taskportal.ai_task_manager.service.impl;

import com.taskportal.ai_task_manager.dto.TaskRequest;
import com.taskportal.ai_task_manager.dto.TaskResponse;
import com.taskportal.ai_task_manager.entity.Task;
import com.taskportal.ai_task_manager.entity.User;
import com.taskportal.ai_task_manager.enums.TaskStatus;
import com.taskportal.ai_task_manager.exception.ResourceNotFoundException;
import com.taskportal.ai_task_manager.repository.TaskRepository;
import com.taskportal.ai_task_manager.repository.UserRepository;
import com.taskportal.ai_task_manager.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    private User getLoggedInUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found"));
    }

    @Override
    public TaskResponse createTask(TaskRequest request) {

        User user = getLoggedInUser();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .dueDate(request.getDueDate())
                .status(request.getStatus())
                .user(user)
                .build();

        Task savedTask =
                taskRepository.save(task);

        return mapToResponse(savedTask);
    }

    @Override
    public List<TaskResponse> getAllTasks() {

        User user = getLoggedInUser();

        return taskRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public TaskResponse getTaskById(Long taskId) {

        Task task = taskRepository.findByIdAndUser(
                taskId,
                getLoggedInUser()
        )
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Task not found"));

        return mapToResponse(task);
    }

    @Override
    public TaskResponse updateTask(
            Long taskId,
            TaskRequest request) {

        Task task = taskRepository.findByIdAndUser(
                taskId,
                getLoggedInUser()
        )
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Task not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setDueDate(request.getDueDate());
        task.setStatus(request.getStatus());

        Task updatedTask =
                taskRepository.save(task);

        return mapToResponse(updatedTask);
    }

    @Override
    public void deleteTask(Long taskId) {

        Task task = taskRepository.findByIdAndUser(
                taskId,
                getLoggedInUser()
        )
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Task not found"));

        taskRepository.delete(task);
    }

    @Override
    public TaskResponse updateTaskStatus(
            Long taskId,
            TaskStatus status) {

        Task task = taskRepository.findByIdAndUser(
                taskId,
                getLoggedInUser()
        )
        .orElseThrow(() ->
                new ResourceNotFoundException(
                        "Task not found"));

        task.setStatus(status);

        Task updatedTask =
                taskRepository.save(task);

        return mapToResponse(updatedTask);
    }

    private TaskResponse mapToResponse(Task task) {

        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .dueDate(task.getDueDate())
                .status(task.getStatus())
                .estimatedEffort(task.getEstimatedEffort())
                .createdTimestamp(task.getCreatedTimestamp())
                .build();
    }
}