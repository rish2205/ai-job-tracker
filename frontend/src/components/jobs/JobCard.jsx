import { memo } from "react";
import { Link } from "react-router-dom";

function JobCard({ job, onDelete }) {
  const companyInitial =
    job.companyName
      ?.trim()
      .charAt(0)
      .toUpperCase() || "?";

  const formatStatus = (status) => {
    if (!status) {
      return "";
    }

    return (
      status.charAt(0) +
      status
        .slice(1)
        .toLowerCase()
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
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <article className="application-card">

      <div className="application-card-top">

        <div className="company-avatar">
          {companyInitial}
        </div>

        <div className="application-main-info">
          <div className="application-title-row">
            <div>
              <h3>
                {job.jobTitle}
              </h3>

              <p className="application-company">
                {job.companyName}
              </p>
            </div>

            <span
              className={`status ${job.status}`}
            >
              {formatStatus(job.status)}
            </span>
          </div>

          <div className="application-meta">
            <span>
              ◉{" "}
              {job.location ||
                "Location not specified"}
            </span>

            <span className="meta-separator">
              •
            </span>

            <span>
              Applied{" "}
              {formatDate(
                job.applicationDate
              )}
            </span>
          </div>
        </div>

      </div>

      <div className="application-card-footer">

        <Link
          to={`/jobs/${job.id}`}
          className="application-view-link"
        >
          View application
          <span>→</span>
        </Link>

        <div className="application-actions">

          <Link
            to={`/jobs/${job.id}/edit`}
            className="application-edit"
          >
            Edit
          </Link>

          <button
            type="button"
            className="application-delete"
            onClick={() =>
              onDelete(job.id)
            }
          >
            Delete
          </button>

        </div>

      </div>

    </article>
  );
}

export default memo(JobCard);