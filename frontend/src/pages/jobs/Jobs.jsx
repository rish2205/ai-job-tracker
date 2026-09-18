import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import JobCard from "../../components/jobs/JobCard";
import JobFilters from "../../components/jobs/JobFilters";
import Loader from "../../components/common/Loader";

import {
  deleteJob,
  getJobs,
} from "../../services/jobService";

import { PAGE_SIZE } from "../../utils/constants";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(0);

  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    last: true,
  });

  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getJobs({
        page,
        size: PAGE_SIZE,
        company,
        status,
      });

      setJobs(data.content);

      setPagination({
        totalPages: data.totalPages,
        totalElements: data.totalElements,
        last: data.last,
      });
    } catch (error) {
      toast.error(
        "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  }, [page, company, status]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJob(id);

      toast.success(
        "Application deleted"
      );

      fetchJobs();
    } catch (error) {
      toast.error(
        "Failed to delete application"
      );
    }
  };

  const handleCompanyChange = (value) => {
    setCompany(value);
    setPage(0);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(0);
  };

  const handleClear = () => {
    setCompany("");
    setStatus("");
    setPage(0);
  };

  return (
    <section className="page applications-page">

      <div className="applications-header">
        <div>
          <span className="applications-eyebrow">
            APPLICATION TRACKER
          </span>

          <h1>
            Your applications
          </h1>

          <p>
            Track every opportunity from
            application to offer.
          </p>
        </div>

        <Link
          className="primary-button"
          to="/jobs/add"
        >
          + Add Application
        </Link>
      </div>


      <div className="applications-summary-bar">

        <div>
          <strong>
            {pagination.totalElements}
          </strong>

          <span>
            Total applications
          </span>
        </div>

        <div className="summary-divider" />

        <div>
          <strong>
            {jobs.length}
          </strong>

          <span>
            Showing on this page
          </span>
        </div>

        <div className="summary-message">
          Keep your application stages
          updated for a clearer view of
          your job search.
        </div>

      </div>


      <div className="applications-toolbar-heading">
        <div>
          <span>APPLICATIONS</span>

          <h2>
            Opportunity pipeline
          </h2>
        </div>
      </div>


      <JobFilters
        company={company}
        status={status}
        onCompanyChange={
          handleCompanyChange
        }
        onStatusChange={
          handleStatusChange
        }
        onClear={handleClear}
      />


      {loading ? (
        <Loader />
      ) : jobs.length === 0 ? (
        <div className="applications-empty">
          <div className="empty-icon">
            ▣
          </div>

          <h2>
            No applications found
          </h2>

          <p>
            Try changing your filters or
            add a new job application.
          </p>

          <Link
            className="primary-button"
            to="/jobs/add"
          >
            Add Application
          </Link>
        </div>
      ) : (
        <>
          <div className="jobs-grid">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onDelete={
                  handleDelete
                }
              />
            ))}
          </div>


          {pagination.totalPages > 1 && (
            <div className="applications-pagination">

              <button
                disabled={page === 0}
                onClick={() =>
                  setPage(
                    (previous) =>
                      previous - 1
                  )
                }
              >
                ← Previous
              </button>

              <div>
                <span>PAGE</span>

                <strong>
                  {page + 1}
                </strong>

                <span>
                  OF
                </span>

                <strong>
                  {pagination.totalPages}
                </strong>
              </div>

              <button
                disabled={
                  pagination.last
                }
                onClick={() =>
                  setPage(
                    (previous) =>
                      previous + 1
                  )
                }
              >
                Next →
              </button>

            </div>
          )}

        </>
      )}

    </section>
  );
}

export default Jobs;