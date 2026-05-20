package com.taskportal.ai_task_manager.exception;

public class DuplicateResourceException
        extends RuntimeException {

    public DuplicateResourceException(
            String message) {

        super(message);
    }
}