import api from "./api";

export const getJobs = async ({
  page = 0,
  size = 8,
  status,
  company,
} = {}) => {
  const params = {
    page,
    size,
  };

  if (status) {
    params.status = status;
  }

  if (company) {
    params.company = company;
  }

  const response = await api.get("/jobs", {
    params,
  });

  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.put(
    `/jobs/${id}`,
    jobData
  );

  return response.data;
};

export const deleteJob = async (id) => {
  await api.delete(`/jobs/${id}`);
};

export const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};