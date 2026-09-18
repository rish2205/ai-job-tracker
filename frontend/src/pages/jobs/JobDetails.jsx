import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

import Loader from "../../components/common/Loader";

import {
  deleteJob,
  getJobById,
} from "../../services/jobService";

import {
  getApplicationAdvice,
} from "../../services/aiService";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [advice, setAdvice] =
    useState(null);

  const [
    adviceLoading,
    setAdviceLoading,
  ] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data =
          await getJobById(id);

        setJob(data);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load application"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this application?"
      )
    ) {
      return;
    }

    try {
      await deleteJob(id);

      toast.success(
        "Application deleted"
      );

      navigate("/jobs");
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete application"
      );
    }
  };

  const handleGetAdvice = async () => {
    try {
      setAdviceLoading(true);

      const result =
        await getApplicationAdvice({
          companyName:
            job.companyName,

          jobTitle:
            job.jobTitle,

          status:
            job.status,

          jobDescription:
            job.jobDescription || "",

          notes:
            job.notes || "",
        });

      setAdvice(result);

      toast.success(
        "AI advice generated"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to get application advice"
      );
    } finally {
      setAdviceLoading(false);
    }
  };


  const handleOpenAiWorkspace = () => {
    navigate(
      "/ai-tools",
      {
        state: {
          job: {
            companyName:
              job.companyName,

            jobTitle:
              job.jobTitle,

            status:
              job.status,

            jobDescription:
              job.jobDescription || "",

            notes:
              job.notes || "",
          },
        },
      }
    );
  };


  const formatDate = (date) => {
    if (!date) {
      return "Not specified";
    }

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      undefined,
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };


  const formatSalary = (salary) => {
    if (!salary) {
      return "Not specified";
    }

    return `₹${Number(
      salary
    ).toLocaleString("en-IN")}`;
  };


  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <section className="page">
        <div className="empty-state">
          <h2>
            Application not found
          </h2>

          <p>
            This application may have
            been removed.
          </p>
        </div>
      </section>
    );
  }


  return (
    <section className="page application-details-page">

      {/* BACK */}

      <Link
        to="/jobs"
        className="details-back-link"
      >
        ← Back to applications
      </Link>


      {/* HERO */}

      <div className="application-details-hero">

        <div className="details-company-avatar">
          {job.companyName
            ?.trim()
            .charAt(0)
            .toUpperCase() || "?"}
        </div>

        <div className="details-title">

          <span className="section-label">
            APPLICATION
          </span>

          <h1>
            {job.jobTitle}
          </h1>

          <p>
            {job.companyName}
          </p>

        </div>

        <span
          className={`status ${job.status}`}
        >
          {job.status}
        </span>

      </div>


      {/* MAIN GRID */}

      <div className="application-details-grid">

        {/* LEFT */}

        <div className="application-details-main">

          <div className="details-information-card">

            <div className="details-card-heading">
              <div>
                <span>
                  OPPORTUNITY
                </span>

                <h2>
                  Application overview
                </h2>
              </div>

              <Link
                to={`/jobs/${id}/edit`}
              >
                Edit details
              </Link>
            </div>


            <div className="details-metadata">

              <div>
                <span>
                  LOCATION
                </span>

                <strong>
                  {job.location ||
                    "Not specified"}
                </strong>
              </div>


              <div>
                <span>
                  SALARY
                </span>

                <strong>
                  {formatSalary(
                    job.salary
                  )}
                </strong>
              </div>


              <div>
                <span>
                  APPLIED ON
                </span>

                <strong>
                  {formatDate(
                    job.applicationDate
                  )}
                </strong>
              </div>


              <div>
                <span>
                  STATUS
                </span>

                <strong>
                  {job.status}
                </strong>
              </div>

            </div>

          </div>


          <div className="details-information-card">

            <div className="details-card-heading">
              <div>
                <span>
                  ROLE
                </span>

                <h2>
                  Job description
                </h2>
              </div>
            </div>

            <div className="details-long-content">
              {job.jobDescription ||
                "No job description available."}
            </div>

          </div>


          <div className="details-information-card">

            <div className="details-card-heading">
              <div>
                <span>
                  NOTES
                </span>

                <h2>
                  Application notes
                </h2>
              </div>
            </div>

            <div className="details-long-content">
              {job.notes ||
                "No notes have been added yet."}
            </div>

          </div>

        </div>


        {/* RIGHT SIDEBAR */}

        <aside className="application-details-sidebar">

          <div className="details-ai-panel">

            <div className="details-ai-icon">
              ✦
            </div>

            <span>
              AI CAREER INTELLIGENCE
            </span>

            <h2>
              Prepare for this opportunity
            </h2>

            <p>
              Use the saved job description
              and role information for
              resume matching, job analysis
              and interview preparation.
            </p>

            <button
              type="button"
              onClick={
                handleOpenAiWorkspace
              }
            >
              Open AI Workspace
              <span>→</span>
            </button>

            <button
              type="button"
              className="details-advice-button"
              onClick={
                handleGetAdvice
              }
              disabled={
                adviceLoading
              }
            >
              {adviceLoading
                ? "Generating..."
                : "Quick AI Advice"}
            </button>

          </div>


          <div className="details-management-card">

            <span>
              APPLICATION MANAGEMENT
            </span>

            <Link
              to={`/jobs/${id}/edit`}
            >
              Edit application
              <span>→</span>
            </Link>

            <button
              type="button"
              onClick={handleDelete}
            >
              Delete application
            </button>

          </div>

        </aside>

      </div>


      {/* AI ADVICE */}

      {advice && (
        <div className="advice-card">

          <div className="advice-header">

            <div>
              <span className="section-label">
                AI CAREER ASSISTANT
              </span>

              <h2>
                Application Advice
              </h2>
            </div>

            <span
              className={`priority-badge priority-${advice.priority?.toLowerCase()}`}
            >
              {advice.priority} PRIORITY
            </span>

          </div>


          <div className="advice-summary">
            <span>Summary</span>

            <p>
              {advice.summary}
            </p>
          </div>


          <div className="advice-columns">

            <div>
              <h3>
                Next Actions
              </h3>

              <ul className="result-list">
                {advice.nextActions?.map(
                  (action, index) => (
                    <li key={index}>
                      <span>✓</span>
                      {action}
                    </li>
                  )
                )}
              </ul>
            </div>


            <div>
              <h3>
                Preparation Tips
              </h3>

              <ul className="result-list">
                {advice.preparationTips?.map(
                  (tip, index) => (
                    <li key={index}>
                      <span>→</span>
                      {tip}
                    </li>
                  )
                )}
              </ul>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}

export default JobDetails;