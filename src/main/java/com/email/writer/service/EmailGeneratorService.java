package com.email.writer.service;

import com.email.writer.dto.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    public EmailGeneratorService() {
        this.webClient = WebClient.builder().build();
    }

    @Value("${gemini.api.url}")
    private String geminiApiURL;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public String generateEmailReply(EmailRequest emailRequest) {
        String prompt = buildPrompt(emailRequest);

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[]{
                        Map.of(
                                "parts", new Object[]{
                                        Map.of("text", prompt)
                                }
                        )
                }
        );

        String[] candidateModels = new String[]{
                "gemini-flash-latest",
                "gemini-3.5-flash",
                "gemini-3.1-flash-lite",
                "gemini-2.5-pro"
        };

        String lastError = null;

        for (String modelName : candidateModels) {
            try {
                String targetUrl = "https://generativelanguage.googleapis.com/v1beta/models/"
                        + modelName + ":generateContent?key=" + geminiApiKey;

                String response = webClient.post()
                        .uri(targetUrl)
                        .header("Content-Type", "application/json")
                        .bodyValue(requestBody)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();

                String extracted = extractResponseContent(response);
                if (extracted != null && !extracted.startsWith("Error Processing Request")) {
                    return extracted;
                }
            } catch (org.springframework.web.reactive.function.client.WebClientResponseException e) {
                lastError = "Gemini API Error (" + e.getStatusCode() + "): " + e.getResponseBodyAsString();
                // If model is overloaded (503/429) or not found (404), continue to next fallback model
                if (e.getStatusCode().value() == 503 || e.getStatusCode().value() == 429 || e.getStatusCode().value() == 404) {
                    continue;
                }
                return lastError;
            } catch (Exception e) {
                lastError = "Server Error: " + e.getMessage();
            }
        }

        return lastError != null ? lastError : "Unable to generate reply at this time. Please try again.";
    }

    private String extractResponseContent(String response) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);

            return rootNode
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error Processing Request: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        prompt.append(
                "Generate a professional reply for the following email. "
                        + "Do not create a subject line."
        );

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append(" Use a ")
                    .append(emailRequest.getTone())
                    .append(" tone.");
        }

        prompt.append("\nOriginal Email: ")
                .append(emailRequest.getEmailContent());

        return prompt.toString();
    }
}

