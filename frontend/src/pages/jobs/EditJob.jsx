import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import JobForm from "../../components/jobs/JobForm";
import Loader from "../../components/common/Loader";

import {
  getJobById,
  updateJob,
} from "../../services/jobService";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (jobData) => {
    try {
      setSaving(true);

      await updateJob(id, jobData);

      toast.success("Application updated successfully");

      navigate(`/jobs/${id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update application"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <section className="page">
        <h2>Application not found</h2>
      </section>
    );
  }

  return (
    <section className="page">
      <h1>Edit Application</h1>

      <JobForm
        initialData={{
          companyName: job.companyName || "",
          jobTitle: job.jobTitle || "",
          location: job.location || "",
          salary: job.salary || "",
          jobDescription: job.jobDescription || "",
          status: job.status || "APPLIED",
          applicationDate: job.applicationDate || "",
          notes: job.notes || "",
        }}
        onSubmit={handleSubmit}
        loading={saving}
        submitText="Update Application"
      />
    </section>
  );
}

export default EditJob;