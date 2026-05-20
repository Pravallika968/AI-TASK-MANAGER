package com.taskportal.ai_task_manager.repository;

import com.taskportal.ai_task_manager.entity.Task;
import com.taskportal.ai_task_manager.entity.User;
import com.taskportal.ai_task_manager.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    List<Task> findByUser(User user);

    List<Task> findByUserAndStatus(
            User user,
            TaskStatus status
    );

    Optional<Task> findByIdAndUser(
            Long id,
            User user
    );
}