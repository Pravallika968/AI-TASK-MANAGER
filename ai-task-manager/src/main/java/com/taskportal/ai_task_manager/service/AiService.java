package com.taskportal.ai_task_manager.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String generateTaskDetails(String title) {

        try {
        	String prompt = """
        			You are a senior project manager AI.

        			Analyze the task and generate STRICT JSON ONLY.

        			Rules:
        			- Do NOT repeat the task title
        			- Improve description professionally
        			- Suggest realistic effort
        			- Priority must be LOW, MEDIUM, or HIGH only

        			Return format:
        			{
        			  "description": "...",
        			  "priority": "LOW|MEDIUM|HIGH",
        			  "estimatedEffort": "..."
        			}

        			Task: %s
        			""".formatted(title);

            // ✅ SAFE JSON BUILD (no string concatenation)
            ObjectNode root = objectMapper.createObjectNode();
            ArrayNode contents = objectMapper.createArrayNode();
            ObjectNode content = objectMapper.createObjectNode();
            ArrayNode parts = objectMapper.createArrayNode();
            ObjectNode part = objectMapper.createObjectNode();

            part.put("text", prompt);
            parts.add(part);
            content.set("parts", parts);
            contents.add(content);
            root.set("contents", contents);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity =
                    new HttpEntity<>(objectMapper.writeValueAsString(root), headers);

            String url = apiUrl + "?key=" + apiKey;

            return restTemplate.postForObject(url, entity, String.class);

        } catch (Exception e) {
            throw new RuntimeException("Gemini API call failed", e);
        }
    }

    // ✅ CLEAN + PARSE RESPONSE SAFELY
    public JsonNode extractJson(String response) {

        try {
            if (response == null) {
                throw new RuntimeException("Empty response from Gemini");
            }

            // remove markdown blocks
            String cleaned = response
                    .replaceAll("```json", "")
                    .replaceAll("```", "")
                    .trim();

            int start = cleaned.indexOf("{");
            int end = cleaned.lastIndexOf("}");

            if (start == -1 || end == -1 || end < start) {
                throw new RuntimeException("No valid JSON found in response");
            }

            String jsonString = cleaned.substring(start, end + 1);

            return objectMapper.readTree(jsonString);

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Gemini response", e);
        }
    }
}