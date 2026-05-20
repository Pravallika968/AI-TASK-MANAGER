package com.taskportal.ai_task_manager.dto;
import com.taskportal.ai_task_manager.enums.Priority;
import com.taskportal.ai_task_manager.enums.TaskStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private Priority priority;
    private LocalDate dueDate;
    private TaskStatus status;
    private String estimatedEffort;
    private LocalDateTime createdTimestamp;
}
