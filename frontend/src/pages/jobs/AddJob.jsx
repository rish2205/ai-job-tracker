import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import JobForm from "../../components/jobs/JobForm";
import { createJob } from "../../services/jobService";

function AddJob() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (jobData) => {
    try {
      setLoading(true);

      await createJob(jobData);

      toast.success("Application added");

      navigate("/jobs");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create application"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>Add Job Application</h1>

      <JobForm
        onSubmit={handleSubmit}
        loading={loading}
        submitText="Add Application"
      />
    </section>
  );
}

export default AddJob;