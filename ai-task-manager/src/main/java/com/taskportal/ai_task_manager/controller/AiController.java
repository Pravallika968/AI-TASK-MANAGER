package com.taskportal.ai_task_manager.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskportal.ai_task_manager.dto.TaskRequest;
import com.taskportal.ai_task_manager.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;
    private final ObjectMapper objectMapper;

    @PostMapping("/generate-task")
    public ResponseEntity<String> generateTask(@RequestBody TaskRequest request) throws Exception {

        String response = aiService.generateTaskDetails(request.getTitle());
        JsonNode root = objectMapper.readTree(response);

        String text = root
                .path("candidates")
                .path(0)
                .path("content")
                .path("parts")
                .path(0)
                .path("text")
                .asText();

        text = cleanJson(text);

        // 🔥 IMPORTANT CHANGE: return STRING JSON (not JsonNode)
        return ResponseEntity.ok(text);
    }

    private String cleanJson(String text) {

        if (text == null) return "{}";

        text = text.trim();

        text = text.replaceAll("(?i)```json", "");
        text = text.replaceAll("(?i)```", "");

        int start = text.indexOf("{");
        int end = text.lastIndexOf("}");

        if (start == -1 || end == -1 || end < start) {
            throw new RuntimeException("Invalid JSON from AI: " + text);
        }

        return text.substring(start, end + 1);
    }
}