import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  analyzeJobDescription,
  generateInterviewQuestions,
  matchResumeToJob,
} from "../../services/aiService";

function AiTools() {
  const location = useLocation();

  const selectedJob =
    location.state?.job;

  const [companyName, setCompanyName] =
    useState("");

  const [jobTitle, setJobTitle] =
    useState("");

  const [
    jobDescription,
    setJobDescription,
  ] = useState("");

  const [resumeText, setResumeText] =
    useState("");

  const [analysis, setAnalysis] =
    useState(null);

  const [
    matchResult,
    setMatchResult,
  ] = useState(null);

  const [questions, setQuestions] =
    useState(null);

  const [
    loadingAction,
    setLoadingAction,
  ] = useState(null);


  /*
   * If AI Tools was opened from
   * JobDetails, pre-fill the saved job.
   */
  useEffect(() => {
    if (!selectedJob) {
      return;
    }

    setCompanyName(
      selectedJob.companyName || ""
    );

    setJobTitle(
      selectedJob.jobTitle || ""
    );

    setJobDescription(
      selectedJob.jobDescription || ""
    );
  }, [selectedJob]);


  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error(
        "Enter a job description first"
      );

      return;
    }

    try {
      setLoadingAction("analyze");

      const result =
        await analyzeJobDescription(
          jobDescription
        );

      setAnalysis(result);

      toast.success(
        "Job description analyzed"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to analyze job description"
      );
    } finally {
      setLoadingAction(null);
    }
  };


  const handleMatch = async () => {
    if (
      !resumeText.trim() ||
      !jobDescription.trim()
    ) {
      toast.error(
        "Enter both resume and job description"
      );

      return;
    }

    try {
      setLoadingAction("match");

      const result =
        await matchResumeToJob({
          resumeText,
          jobDescription,
        });

      setMatchResult(result);

      toast.success(
        "Resume matching completed"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to match resume"
      );
    } finally {
      setLoadingAction(null);
    }
  };

const handleQuestions = async () => {
  if (!jobDescription.trim()) {
    toast.error(
      "Enter a job description first"
    );

    return;
  }

  if (
    !companyName.trim() ||
    !jobTitle.trim()
  ) {
    toast.error(
      "Enter the company name and job title first"
    );

    return;
  }

  try {
    setLoadingAction("questions");

    const result =
      await generateInterviewQuestions({
        jobTitle: jobTitle.trim(),
        companyName: companyName.trim(),
        jobDescription,
      });

    setQuestions(result);

    toast.success(
      "Interview questions generated"
    );
  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to generate questions"
    );
  } finally {
    setLoadingAction(null);
  }
};


  const jobWordCount =
    jobDescription.trim()
      ? jobDescription
          .trim()
          .split(/\s+/)
          .length
      : 0;

  const resumeWordCount =
    resumeText.trim()
      ? resumeText
          .trim()
          .split(/\s+/)
          .length
      : 0;


  const safeMatchScore = Math.min(
    100,
    Math.max(
      0,
      matchResult?.matchScore || 0
    )
  );


  return (
    <section className="page ai-workspace-page">

      {/* HEADER */}

      <div className="ai-workspace-header">

        <div>
          <span className="ai-workspace-eyebrow">
            AI CAREER INTELLIGENCE
          </span>

          <h1>
            AI Workspace
          </h1>

          <p>
            Analyze opportunities, compare
            your resume and prepare for
            interviews from one workspace.
          </p>
        </div>

        <div className="ai-online-badge">
          <span />
          AI Assistant Ready
        </div>

      </div>


      {/* SELECTED APPLICATION */}

      {selectedJob && (
        <div className="selected-job-banner">

          <div className="selected-job-icon">
            {selectedJob.companyName
              ?.trim()
              .charAt(0)
              .toUpperCase() || "?"}
          </div>

          <div>
            <span>
              SELECTED APPLICATION
            </span>

            <strong>
              {selectedJob.jobTitle}
            </strong>

            <p>
              {selectedJob.companyName}
            </p>
          </div>

          <div className="selected-job-status">
            Job details loaded
          </div>

        </div>
      )}


      {/* WORKSPACE INTRO */}

      <div className="ai-workflow">

        <div className="ai-workflow-step">
          <span>01</span>

          <div>
            <strong>
              Analyze role
            </strong>

            <p>
              Extract skills and
              technologies.
            </p>
          </div>
        </div>

        <div className="workflow-line" />

        <div className="ai-workflow-step">
          <span>02</span>

          <div>
            <strong>
              Match resume
            </strong>

            <p>
              Identify strengths and
              skill gaps.
            </p>
          </div>
        </div>

        <div className="workflow-line" />

        <div className="ai-workflow-step">
          <span>03</span>

          <div>
            <strong>
              Prepare
            </strong>

            <p>
              Generate targeted interview
              questions.
            </p>
          </div>
        </div>

      </div>


      {/* ==================================
          JOB ANALYZER
      ================================== */}

      <div className="ai-workspace-card">

        <div className="ai-workspace-card-header">

          <div className="ai-section-number">
            01
          </div>

          <div>
            <span className="section-label">
              OPPORTUNITY INTELLIGENCE
            </span>

            <h2>
              Job Description Analyzer
            </h2>

            <p>
              Add the opportunity details
              and let AI identify the most
              important requirements.
            </p>
          </div>

        </div>


        <div className="ai-role-grid">

          <div className="ai-field">
            <label>
              Company
            </label>

            <input
              type="text"
              placeholder="e.g. Amazon"
              value={companyName}
              onChange={(event) =>
                setCompanyName(
                  event.target.value
                )
              }
            />
          </div>


          <div className="ai-field">
            <label>
              Job title
            </label>

            <input
              type="text"
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(event) =>
                setJobTitle(
                  event.target.value
                )
              }
            />
          </div>

        </div>


        <div className="ai-field ai-jd-field">
          <div className="ai-field-heading">
            <label>
              Job description
            </label>

            <span>
              {jobWordCount} words
            </span>
          </div>

          <textarea
            rows="11"
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(event) =>
              setJobDescription(
                event.target.value
              )
            }
          />
        </div>


        <div className="ai-card-action">

          <div>
            <strong>
              Analyze this opportunity
            </strong>

            <span>
              AI will identify role,
              skills, technologies and
              experience requirements.
            </span>
          </div>

          <button
            className="ai-primary-action"
            onClick={handleAnalyze}
            disabled={
              loadingAction !== null
            }
          >
            {loadingAction === "analyze"
              ? "Analyzing..."
              : "✦ Analyze Job"}
          </button>

        </div>


        {analysis && (
          <div className="ai-analysis-output">

            <div className="ai-result-title">

              <div>
                <span>
                  DETECTED ROLE
                </span>

                <h3>
                  {analysis.role}
                </h3>
              </div>

              <span className="analysis-complete">
                ✓ Analysis complete
              </span>

            </div>


            <div className="ai-result-grid">

              <div className="ai-result-panel">

                <div className="result-panel-heading">
                  <span>01</span>

                  <h4>
                    Required Skills
                  </h4>
                </div>

                <div className="skill-list">
                  {analysis.requiredSkills?.map(
                    (skill) => (
                      <span
                        className="skill-chip"
                        key={skill}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

              </div>


              <div className="ai-result-panel">

                <div className="result-panel-heading">
                  <span>02</span>

                  <h4>
                    Preferred Skills
                  </h4>
                </div>

                {analysis.preferredSkills
                  ?.length > 0 ? (
                  <div className="skill-list">
                    {analysis.preferredSkills.map(
                      (skill) => (
                        <span
                          className="skill-chip secondary"
                          key={skill}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="result-empty-text">
                    No preferred skills
                    identified.
                  </p>
                )}

              </div>


              <div className="ai-result-panel">

                <div className="result-panel-heading">
                  <span>03</span>

                  <h4>
                    Technologies
                  </h4>
                </div>

                <div className="skill-list">
                  {analysis.technologies?.map(
                    (technology) => (
                      <span
                        className="technology-chip"
                        key={technology}
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>

              </div>

            </div>


            {analysis.experience && (
              <div className="experience-result">
                <span>
                  EXPERIENCE REQUIREMENT
                </span>

                <p>
                  {analysis.experience}
                </p>
              </div>
            )}

          </div>
        )}

      </div>


      {/* ==================================
          RESUME MATCHER
      ================================== */}

      <div className="ai-workspace-card">

        <div className="ai-workspace-card-header">

          <div className="ai-section-number">
            02
          </div>

          <div>
            <span className="section-label">
              RESUME INTELLIGENCE
            </span>

            <h2>
              Resume Matcher
            </h2>

            <p>
              Compare your resume with the
              opportunity and identify the
              strongest matches and gaps.
            </p>
          </div>

        </div>


        <div className="resume-match-layout">

          <div className="resume-input-panel">

            <div className="resume-panel-heading">
              <div>
                <span>
                  YOUR RESUME
                </span>

                <h3>
                  Resume content
                </h3>
              </div>

              <span>
                {resumeWordCount} words
              </span>
            </div>

            <textarea
              rows="14"
              placeholder="Paste your resume text here..."
              value={resumeText}
              onChange={(event) =>
                setResumeText(
                  event.target.value
                )
              }
            />

          </div>


          <div className="job-match-preview">

            <span>
              TARGET OPPORTUNITY
            </span>

            <div className="target-company-icon">
              {companyName
                ?.trim()
                .charAt(0)
                .toUpperCase() || "?"}
            </div>

            <h3>
              {jobTitle ||
                "Job title not added"}
            </h3>

            <p>
              {companyName ||
                "Company not added"}
            </p>

            <div className="target-jd-status">
              <span
                className={
                  jobDescription.trim()
                    ? "ready"
                    : ""
                }
              />

              {jobDescription.trim()
                ? "Job description ready"
                : "Job description required"}
            </div>

          </div>

        </div>


        <div className="ai-card-action">

          <div>
            <strong>
              Compare resume to job
            </strong>

            <span>
              Get a match score, missing
              skills and targeted
              improvement suggestions.
            </span>
          </div>

          <button
            className="ai-primary-action"
            onClick={handleMatch}
            disabled={
              loadingAction !== null
            }
          >
            {loadingAction === "match"
              ? "Matching..."
              : "✦ Analyze Match"}
          </button>

        </div>


        {matchResult && (
          <div className="resume-match-result">

            <div className="match-score-hero">

              <div
                className="modern-score-circle"
                style={{
                  "--score":
                    `${safeMatchScore * 3.6}deg`,
                }}
              >
                <div>
                  <strong>
                    {matchResult.matchScore}%
                  </strong>

                  <span>
                    MATCH
                  </span>
                </div>
              </div>


              <div className="match-score-copy">

                <span>
                  RESUME MATCH SCORE
                </span>

                <h3>
                  Resume compatibility
                </h3>

                <p>
                  Your resume currently
                  matches{" "}
                  <strong>
                    {matchResult.matchScore}%
                  </strong>{" "}
                  of the requirements
                  identified for this
                  opportunity.
                </p>


                <div className="score-track">
                  <div
                    className="score-fill"
                    style={{
                      width:
                        `${safeMatchScore}%`,
                    }}
                  />
                </div>

              </div>

            </div>


            <div className="resume-results-grid">

              <div className="resume-result-column match-column">

                <div className="resume-result-heading">
                  <span className="result-status-icon success">
                    ✓
                  </span>

                  <div>
                    <span>
                      STRENGTHS
                    </span>

                    <h4>
                      Matching Skills
                    </h4>
                  </div>
                </div>


                <div className="resume-skill-stack">
                  {matchResult.matchingSkills
                    ?.length > 0 ? (
                    matchResult.matchingSkills.map(
                      (skill) => (
                        <div
                          key={skill}
                          className="resume-skill-row"
                        >
                          <span>✓</span>

                          <strong>
                            {skill}
                          </strong>

                          <small>
                            Match
                          </small>
                        </div>
                      )
                    )
                  ) : (
                    <p className="result-empty-text">
                      No matching skills
                      identified.
                    </p>
                  )}
                </div>

              </div>


              <div className="resume-result-column missing-column">

                <div className="resume-result-heading">
                  <span className="result-status-icon warning">
                    !
                  </span>

                  <div>
                    <span>
                      GAPS
                    </span>

                    <h4>
                      Missing Skills
                    </h4>
                  </div>
                </div>


                <div className="resume-skill-stack">
                  {matchResult.missingSkills
                    ?.length > 0 ? (
                    matchResult.missingSkills.map(
                      (skill) => (
                        <div
                          key={skill}
                          className="resume-skill-row missing"
                        >
                          <span>+</span>

                          <strong>
                            {skill}
                          </strong>

                          <small>
                            Consider
                          </small>
                        </div>
                      )
                    )
                  ) : (
                    <p className="result-empty-text">
                      No major skill gaps
                      identified.
                    </p>
                  )}
                </div>

              </div>

            </div>


            <div className="recommendation-panel">

              <div className="recommendation-heading">
                <span>✦</span>

                <div>
                  <span>
                    AI RECOMMENDATIONS
                  </span>

                  <h3>
                    Resume improvements
                  </h3>
                </div>
              </div>


              <div className="recommendation-list">
                {matchResult.suggestions?.map(
                  (
                    suggestion,
                    index
                  ) => (
                    <div
                      className="recommendation-item"
                      key={index}
                    >
                      <span>
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <p>
                        {suggestion}
                      </p>
                    </div>
                  )
                )}
              </div>

            </div>

          </div>
        )}

      </div>


      {/* ==================================
          INTERVIEW PREPARATION
      ================================== */}

      <div className="ai-workspace-card">

        <div className="ai-workspace-card-header">

          <div className="ai-section-number">
            03
          </div>

          <div>
            <span className="section-label">
              INTERVIEW PREPARATION
            </span>

            <h2>
              Interview Question Generator
            </h2>

            <p>
              Generate questions tailored
              to the actual company, role
              and job description.
            </p>
          </div>

        </div>


        <div className="interview-target">

          <div>
            <span>
              TARGET ROLE
            </span>

            <strong>
              {jobTitle ||
                "Add a job title above"}
            </strong>

            <p>
              {companyName ||
                "Add a company above"}
            </p>
          </div>


          <div className="interview-ready-status">
            <span
              className={
                jobDescription.trim() &&
                jobTitle.trim()
                  ? "ready"
                  : ""
              }
            />

            {jobDescription.trim() &&
            jobTitle.trim()
              ? "Ready to generate"
              : "Role details required"}
          </div>

        </div>


        <div className="ai-card-action">

          <div>
            <strong>
              Practice for this role
            </strong>

            <span>
              Generate technical, project
              and behavioral questions
              based on this opportunity.
            </span>
          </div>

          <button
            className="ai-primary-action"
            onClick={
              handleQuestions
            }
            disabled={
              loadingAction !== null
            }
          >
            {loadingAction ===
            "questions"
              ? "Generating..."
              : "✦ Generate Questions"}
          </button>

        </div>


        {questions && (
          <div className="interview-results">

            <div className="interview-results-header">
              <div>
                <span>
                  INTERVIEW PREP
                </span>

                <h3>
                  Questions for{" "}
                  {jobTitle}
                </h3>

                <p>
                  {companyName ||
                    "Target Company"}
                </p>
              </div>

              <span className="analysis-complete">
                ✓ Questions ready
              </span>
            </div>


            <div className="question-grid">

              <QuestionCategory
                number="01"
                title="Technical Questions"
                questions={
                  questions.technicalQuestions
                }
              />

              <QuestionCategory
                number="02"
                title="Project Questions"
                questions={
                  questions.projectQuestions
                }
              />

              <QuestionCategory
                number="03"
                title="Behavioral Questions"
                questions={
                  questions.behavioralQuestions
                }
              />

            </div>

          </div>
        )}

      </div>

    </section>
  );
}


function QuestionCategory({
  number,
  title,
  questions,
}) {
  return (
    <div className="modern-question-card">

      <div className="modern-question-header">
        <span>
          {number}
        </span>

        <h3>
          {title}
        </h3>
      </div>


      <ol>
        {questions?.map(
          (question, index) => (
            <li key={index}>

              <span className="modern-question-number">
                {String(
                  index + 1
                ).padStart(
                  2,
                  "0"
                )}
              </span>

              <p>
                {question}
              </p>

            </li>
          )
        )}
      </ol>

    </div>
  );
}

export default AiTools;