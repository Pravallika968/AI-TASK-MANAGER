package com.taskportal.ai_task_manager.dto;

import com.taskportal.ai_task_manager.enums.Priority;
import com.taskportal.ai_task_manager.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private Priority priority;

    private LocalDate dueDate;

    private TaskStatus status;
}
