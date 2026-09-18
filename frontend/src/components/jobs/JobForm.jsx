import {
  useEffect,
  useState,
} from "react";

import {
  APPLICATION_STATUSES,
} from "../../utils/constants";

const initialState = {
  companyName: "",
  jobTitle: "",
  location: "",
  salary: "",
  jobDescription: "",
  status: "APPLIED",
  applicationDate: "",
  notes: "",
};

function JobForm({
  initialData = initialState,
  onSubmit,
  loading = false,
  submitText = "Save Application",
}) {
  const [formData, setFormData] =
    useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...formData,

      salary:
        formData.salary === ""
          ? null
          : Number(formData.salary),
    });
  };

  return (
    <form
      className="job-form job-form-modern"
      onSubmit={handleSubmit}
    >

      {/* BASIC INFORMATION */}

      <div className="form-section">

        <div className="form-section-heading">
          <span>01</span>

          <div>
            <h3>
              Role information
            </h3>

            <p>
              Add the company and position
              you are applying for.
            </p>
          </div>
        </div>

        <div className="form-grid">

          <div className="form-field">
            <label htmlFor="companyName">
              Company name
              <span>*</span>
            </label>

            <input
              id="companyName"
              name="companyName"
              placeholder="e.g. Amazon"
              value={
                formData.companyName
              }
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-field">
            <label htmlFor="jobTitle">
              Job title
              <span>*</span>
            </label>

            <input
              id="jobTitle"
              name="jobTitle"
              placeholder="e.g. Software Engineer"
              value={
                formData.jobTitle
              }
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-field">
            <label htmlFor="location">
              Location
            </label>

            <input
              id="location"
              name="location"
              placeholder="e.g. Chennai, India"
              value={
                formData.location
              }
              onChange={handleChange}
            />
          </div>


          <div className="form-field">
            <label htmlFor="salary">
              Salary
            </label>

            <input
              id="salary"
              type="number"
              name="salary"
              placeholder="e.g. 600000"
              value={
                formData.salary ?? ""
              }
              onChange={handleChange}
            />

            <small>
              Enter annual salary if known.
            </small>
          </div>

        </div>

      </div>


      {/* APPLICATION DETAILS */}

      <div className="form-section">

        <div className="form-section-heading">
          <span>02</span>

          <div>
            <h3>
              Application details
            </h3>

            <p>
              Track when you applied and
              the current stage.
            </p>
          </div>
        </div>


        <div className="form-grid">

          <div className="form-field">
            <label htmlFor="applicationDate">
              Application date
            </label>

            <input
              id="applicationDate"
              type="date"
              name="applicationDate"
              value={
                formData.applicationDate ||
                ""
              }
              onChange={handleChange}
            />
          </div>


          <div className="form-field">
            <label htmlFor="status">
              Application status
            </label>

            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              {APPLICATION_STATUSES.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

      </div>


      {/* JOB DESCRIPTION */}

      <div className="form-section">

        <div className="form-section-heading">
          <span>03</span>

          <div>
            <h3>
              Job description
            </h3>

            <p>
              Save the description so it
              can also be used with your
              AI career tools.
            </p>
          </div>
        </div>


        <div className="form-field">
          <label htmlFor="jobDescription">
            Job description
          </label>

          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Paste the job description here..."
            rows="9"
            value={
              formData.jobDescription
            }
            onChange={handleChange}
          />

          <small>
            Include responsibilities,
            requirements and preferred
            skills for better AI analysis.
          </small>
        </div>

      </div>


      {/* NOTES */}

      <div className="form-section">

        <div className="form-section-heading">
          <span>04</span>

          <div>
            <h3>
              Personal notes
            </h3>

            <p>
              Keep useful information about
              recruiters, interviews or
              follow-ups.
            </p>
          </div>
        </div>


        <div className="form-field">
          <label htmlFor="notes">
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            placeholder="Add notes about this application..."
            rows="5"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

      </div>


      {/* SUBMIT */}

      <div className="form-submit-area">

        <div>
          <strong>
            Ready to save?
          </strong>

          <span>
            You can update these details
            anytime.
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : submitText}
        </button>

      </div>

    </form>
  );
}

export default JobForm;