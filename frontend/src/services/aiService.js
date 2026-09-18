import api from "./api";

export const analyzeJobDescription = async (jobDescription) => {
  const response = await api.post("/ai/analyze-job", {
    jobDescription,
  });

  return response.data;
};

export const matchResumeToJob = async ({
  resumeText,
  jobDescription,
}) => {
  const response = await api.post("/ai/match-resume", {
    resumeText,
    jobDescription,
  });

  return response.data;
};

export const generateInterviewQuestions = async ({
  jobTitle,
  companyName,
  jobDescription,
}) => {
  const response = await api.post("/ai/interview-questions", {
    jobTitle,
    companyName,
    jobDescription,
  });

  return response.data;
};

export const getApplicationAdvice = async ({
  companyName,
  jobTitle,
  status,
  jobDescription,
  notes,
}) => {
  const response = await api.post(
    "/ai/application-advice",
    {
      companyName,
      jobTitle,
      status,
      jobDescription,
      notes,
    }
  );

  return response.data;
};