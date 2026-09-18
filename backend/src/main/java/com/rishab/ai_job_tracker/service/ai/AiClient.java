package com.rishab.ai_job_tracker.service.ai;

import com.rishab.ai_job_tracker.dto.ai.ApplicationAdviceResponse;
import com.rishab.ai_job_tracker.dto.ai.InterviewQuestionResponse;
import com.rishab.ai_job_tracker.dto.ai.JobAnalysisResponse;
import com.rishab.ai_job_tracker.dto.ai.ResumeMatchResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class AiClient {

    private final ObjectMapper objectMapper;

    @Value("${ai.openai.api-key}")
    private String apiKey;

    @Value("${ai.openai.url}")
    private String apiUrl;

    @Value("${ai.openai.model}")
    private String model;


    // =========================================================
    // JOB DESCRIPTION ANALYSIS
    // =========================================================

    public JobAnalysisResponse analyzeJobDescription(
            String jobDescription) {

        RestClient restClient = RestClient.create();

        Map<String, Object> requestBody =
                createJobAnalysisRequest(
                        jobDescription
                );

        JsonNode response = restClient.post()
                .uri(apiUrl)
                .header(
                        "Authorization",
                        "Bearer " + apiKey
                )
                .header(
                        "Content-Type",
                        "application/json"
                )
                .body(requestBody)
                .retrieve()
                .body(JsonNode.class);

        return parseJobAnalysisResponse(response);
    }


    private Map<String, Object> createJobAnalysisRequest(
            String jobDescription) {

        String instructions = """
                You are a job description analysis system.

                Analyze the supplied job description.

                Extract only information supported by the
                job description.

                Do not invent skills or experience requirements.
                """;

        Map<String, Object> schema = Map.of(
                "type", "object",

                "properties", Map.of(

                        "role", Map.of(
                                "type", "string"
                        ),

                        "requiredSkills", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "preferredSkills", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "technologies", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "experience", Map.of(
                                "type", "string"
                        )
                ),

                "required", List.of(
                        "role",
                        "requiredSkills",
                        "preferredSkills",
                        "technologies",
                        "experience"
                ),

                "additionalProperties", false
        );

        Map<String, Object> format = Map.of(
                "type", "json_schema",
                "name", "job_analysis",
                "strict", true,
                "schema", schema
        );

        return Map.of(
                "model", model,
                "instructions", instructions,
                "input", jobDescription,
                "text", Map.of(
                        "format", format
                )
        );
    }


    private JobAnalysisResponse parseJobAnalysisResponse(
            JsonNode response) {

        try {

            String jsonText =
                    extractOutputText(response);

            return objectMapper.readValue(
                    jsonText,
                    JobAnalysisResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse job analysis response",
                    e
            );
        }
    }


    // =========================================================
    // RESUME MATCHING
    // =========================================================

    public ResumeMatchResponse matchResume(
            String resumeText,
            String jobDescription) {

        RestClient restClient = RestClient.create();

        Map<String, Object> requestBody =
                createResumeMatchRequest(
                        resumeText,
                        jobDescription
                );

        JsonNode response = restClient.post()
                .uri(apiUrl)
                .header(
                        "Authorization",
                        "Bearer " + apiKey
                )
                .header(
                        "Content-Type",
                        "application/json"
                )
                .body(requestBody)
                .retrieve()
                .body(JsonNode.class);

        return parseResumeMatchResponse(response);
    }


    private Map<String, Object> createResumeMatchRequest(
            String resumeText,
            String jobDescription) {

        String instructions = """
                You are a resume and job matching system.

                Compare the candidate's resume with the supplied
                job description.

                Determine how well the resume matches the job.

                Identify matching skills and missing skills.

                Provide practical suggestions for improving the
                candidate's alignment with the role.

                Base your analysis only on the supplied resume
                and job description.

                Do not invent candidate experience or skills.

                The match score must be between 0 and 100.
                """;

        Map<String, Object> schema = Map.of(
                "type", "object",

                "properties", Map.of(

                        "matchScore", Map.of(
                                "type", "integer",
                                "minimum", 0,
                                "maximum", 100
                        ),

                        "matchingSkills", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "missingSkills", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "suggestions", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        )
                ),

                "required", List.of(
                        "matchScore",
                        "matchingSkills",
                        "missingSkills",
                        "suggestions"
                ),

                "additionalProperties", false
        );

        Map<String, Object> format = Map.of(
                "type", "json_schema",
                "name", "resume_match",
                "strict", true,
                "schema", schema
        );

        String input = """
                RESUME:
                %s

                JOB DESCRIPTION:
                %s
                """.formatted(
                resumeText,
                jobDescription
        );

        return Map.of(
                "model", model,
                "instructions", instructions,
                "input", input,
                "text", Map.of(
                        "format", format
                )
        );
    }


    private ResumeMatchResponse parseResumeMatchResponse(
            JsonNode response) {

        try {

            String jsonText =
                    extractOutputText(response);

            return objectMapper.readValue(
                    jsonText,
                    ResumeMatchResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse resume match response",
                    e
            );
        }
    }


    // =========================================================
    // INTERVIEW QUESTION GENERATION
    // =========================================================

    public InterviewQuestionResponse generateInterviewQuestions(
            String jobTitle,
            String companyName,
            String jobDescription) {

        RestClient restClient = RestClient.create();

        Map<String, Object> requestBody =
                createInterviewQuestionRequest(
                        jobTitle,
                        companyName,
                        jobDescription
                );

        JsonNode response = restClient.post()
                .uri(apiUrl)
                .header(
                        "Authorization",
                        "Bearer " + apiKey
                )
                .header(
                        "Content-Type",
                        "application/json"
                )
                .body(requestBody)
                .retrieve()
                .body(JsonNode.class);

        return parseInterviewQuestionResponse(response);
    }


    private Map<String, Object> createInterviewQuestionRequest(
            String jobTitle,
            String companyName,
            String jobDescription) {

        String instructions = """
                You are an interview preparation assistant.

                Generate interview questions relevant to the
                supplied job title and job description.

                Generate technical questions based on the skills
                and technologies mentioned in the job description.

                Generate project questions that help the candidate
                prepare to discuss relevant project experience.

                Generate behavioral questions appropriate for
                the role.

                Do not assume technologies or requirements that
                are not supported by the supplied job information.
                """;

        Map<String, Object> schema = Map.of(
                "type", "object",

                "properties", Map.of(

                        "technicalQuestions", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "projectQuestions", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "behavioralQuestions", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        )
                ),

                "required", List.of(
                        "technicalQuestions",
                        "projectQuestions",
                        "behavioralQuestions"
                ),

                "additionalProperties", false
        );

        Map<String, Object> format = Map.of(
                "type", "json_schema",
                "name", "interview_questions",
                "strict", true,
                "schema", schema
        );

        String input = """
                JOB TITLE:
                %s

                COMPANY:
                %s

                JOB DESCRIPTION:
                %s
                """.formatted(
                jobTitle,
                companyName,
                jobDescription
        );

        return Map.of(
                "model", model,
                "instructions", instructions,
                "input", input,
                "text", Map.of(
                        "format", format
                )
        );
    }


    private InterviewQuestionResponse parseInterviewQuestionResponse(
            JsonNode response) {

        try {

            String jsonText =
                    extractOutputText(response);

            return objectMapper.readValue(
                    jsonText,
                    InterviewQuestionResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse interview question response",
                    e
            );
        }
    }


    // =========================================================
    // APPLICATION ADVICE
    // =========================================================

    public ApplicationAdviceResponse getApplicationAdvice(
            String companyName,
            String jobTitle,
            String status,
            String jobDescription,
            String notes) {

        RestClient restClient = RestClient.create();

        Map<String, Object> requestBody =
                createApplicationAdviceRequest(
                        companyName,
                        jobTitle,
                        status,
                        jobDescription,
                        notes
                );

        JsonNode response = restClient.post()
                .uri(apiUrl)
                .header(
                        "Authorization",
                        "Bearer " + apiKey
                )
                .header(
                        "Content-Type",
                        "application/json"
                )
                .body(requestBody)
                .retrieve()
                .body(JsonNode.class);

        return parseApplicationAdviceResponse(
                response
        );
    }


    private Map<String, Object> createApplicationAdviceRequest(
            String companyName,
            String jobTitle,
            String status,
            String jobDescription,
            String notes) {

        String instructions = """
                You are a job application strategy assistant.

                Analyze the candidate's current job application.

                Recommend practical next actions based on the
                application's current status and supplied context.

                Provide preparation tips relevant to the role.

                Do not invent information about the company,
                candidate, interview process, or application.

                Base recommendations only on the supplied information.

                Priority must be one of:
                LOW, MEDIUM, HIGH.
                """;

        Map<String, Object> schema = Map.of(
                "type", "object",

                "properties", Map.of(

                        "summary", Map.of(
                                "type", "string"
                        ),

                        "priority", Map.of(
                                "type", "string",
                                "enum", List.of(
                                        "LOW",
                                        "MEDIUM",
                                        "HIGH"
                                )
                        ),

                        "nextActions", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        ),

                        "preparationTips", Map.of(
                                "type", "array",
                                "items", Map.of(
                                        "type", "string"
                                )
                        )
                ),

                "required", List.of(
                        "summary",
                        "priority",
                        "nextActions",
                        "preparationTips"
                ),

                "additionalProperties", false
        );

        Map<String, Object> format = Map.of(
                "type", "json_schema",
                "name", "application_advice",
                "strict", true,
                "schema", schema
        );

        String input = """
                COMPANY:
                %s

                JOB TITLE:
                %s

                APPLICATION STATUS:
                %s

                JOB DESCRIPTION:
                %s

                NOTES:
                %s
                """.formatted(
                companyName,
                jobTitle,
                status,
                jobDescription != null
                        ? jobDescription
                        : "",
                notes != null
                        ? notes
                        : ""
        );

        return Map.of(
                "model", model,
                "instructions", instructions,
                "input", input,
                "text", Map.of(
                        "format", format
                )
        );
    }


    private ApplicationAdviceResponse parseApplicationAdviceResponse(
            JsonNode response) {

        try {

            String jsonText =
                    extractOutputText(response);

            return objectMapper.readValue(
                    jsonText,
                    ApplicationAdviceResponse.class
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to parse application advice response",
                    e
            );
        }
    }


    // =========================================================
    // COMMON OPENAI RESPONSE PARSER
    // =========================================================

    private String extractOutputText(
            JsonNode response) {

        if (response == null) {
            throw new RuntimeException(
                    "OpenAI returned null response"
            );
        }

        JsonNode output =
                response.path("output");

        if (!output.isArray() ||
                output.isEmpty()) {

            throw new RuntimeException(
                    "OpenAI response does not contain output"
            );
        }

        for (JsonNode outputItem : output) {

            if (!"message".equals(
                    outputItem
                            .path("type")
                            .asText())) {

                continue;
            }

            JsonNode content =
                    outputItem.path("content");

            if (!content.isArray()) {
                continue;
            }

            for (JsonNode contentItem : content) {

                if ("output_text".equals(
                        contentItem
                                .path("type")
                                .asText())) {

                    String text =
                            contentItem
                                    .path("text")
                                    .asText();

                    if (text != null &&
                            !text.isBlank()) {

                        return text;
                    }
                }
            }
        }

        throw new RuntimeException(
                "OpenAI response does not contain output text"
        );
    }
}