package com.taskportal.ai_task_manager.controller;

import com.taskportal.ai_task_manager.dto.TaskRequest;
import com.taskportal.ai_task_manager.dto.TaskResponse;
import com.taskportal.ai_task_manager.enums.TaskStatus;
import com.taskportal.ai_task_manager.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public TaskResponse createTask(
            @Valid @RequestBody TaskRequest request) {

        return taskService.createTask(request);
    }

    @GetMapping
    public List<TaskResponse> getAllTasks() {

        return taskService.getAllTasks();
    }
    @GetMapping("/{id}")
    public TaskResponse getTaskById(
            @PathVariable Long id) {

        return taskService.getTaskById(id);
    }
    @PutMapping("/{id}")
    public TaskResponse updateTask(
            @PathVariable Long id,
            @RequestBody TaskRequest request) {

        return taskService.updateTask(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);

        return "Task deleted successfully";
    }

    @PatchMapping("/{id}/status")
    public TaskResponse updateTaskStatus(
            @PathVariable Long id,
            @RequestParam TaskStatus status) {

        return taskService
                .updateTaskStatus(id, status);
    }
}