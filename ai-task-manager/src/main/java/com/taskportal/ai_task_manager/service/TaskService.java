package com.taskportal.ai_task_manager.service;

import com.taskportal.ai_task_manager.dto.TaskRequest;
import com.taskportal.ai_task_manager.dto.TaskResponse;
import com.taskportal.ai_task_manager.enums.TaskStatus;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(TaskRequest request);
    TaskResponse getTaskById(Long taskId);

    List<TaskResponse> getAllTasks();

    TaskResponse updateTask(
            Long taskId,
            TaskRequest request
    );

    void deleteTask(Long taskId);

    TaskResponse updateTaskStatus(
            Long taskId,
            TaskStatus status
    );
}