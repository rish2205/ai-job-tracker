import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";

function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const from =
    location.state?.from?.pathname || "/dashboard";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      await login(formData);

      toast.success("Login successful");

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-experience">
      <section className="auth-product-panel">
        <div className="auth-product-content">

          <div className="auth-logo">
            <div className="auth-logo-icon">
              AI
            </div>

            <div>
              <strong>AI Job Tracker</strong>
              <span>
                Career Intelligence Workspace
              </span>
            </div>
          </div>

          <div className="auth-hero-copy">
            <span className="auth-eyebrow">
              YOUR CAREER COMMAND CENTER
            </span>

            <h1>
              Turn your job search into
              a smarter process.
            </h1>

            <p>
              Track every opportunity,
              understand what companies are
              looking for and prepare for
              each stage with AI-assisted
              insights.
            </p>
          </div>

          <div className="auth-demo-area">

            <div className="auth-floating-card applications-preview">
              <div className="preview-card-heading">
                <div>
                  <span>APPLICATION PIPELINE</span>
                  <strong>
                    Your job search
                  </strong>
                </div>

                <span className="preview-live">
                  LIVE
                </span>
              </div>

              <div className="preview-stats">
                <div>
                  <strong>12</strong>
                  <span>Applied</span>
                </div>

                <div>
                  <strong>4</strong>
                  <span>Interviews</span>
                </div>

                <div>
                  <strong>2</strong>
                  <span>Offers</span>
                </div>
              </div>
            </div>

            <div className="auth-floating-card match-preview">
              <div className="preview-card-heading">
                <div>
                  <span>AI RESUME MATCH</span>
                  <strong>
                    Software Engineer
                  </strong>
                </div>

                <div className="preview-score">
                  86%
                </div>
              </div>

              <div className="preview-progress">
                <div />
              </div>

              <div className="preview-skills">
                <span>Java</span>
                <span>Spring Boot</span>
                <span>REST</span>
                <span>SQL</span>
              </div>
            </div>

            <div className="auth-floating-card intelligence-preview">
              <span className="preview-small-title">
                AI CAREER INTELLIGENCE
              </span>

              <div className="intelligence-item">
                <span>✓</span>
                <p>Analyze job requirements</p>
              </div>

              <div className="intelligence-item">
                <span>✓</span>
                <p>Discover resume skill gaps</p>
              </div>

              <div className="intelligence-item">
                <span>✓</span>
                <p>Prepare interview questions</p>
              </div>

              <div className="intelligence-item">
                <span>✓</span>
                <p>Plan your next application step</p>
              </div>
            </div>

          </div>
        </div>

        <div className="auth-background-word">
          CAREER
        </div>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-container">

          <div className="auth-mobile-brand">
            <div className="auth-logo-icon">
              AI
            </div>

            <strong>AI Job Tracker</strong>
          </div>

          <div className="auth-form-heading">
            <span className="auth-form-label">
              WELCOME BACK
            </span>

            <h2>
              Continue your job search.
            </h2>

            <p>
              Sign in to access your
              applications, AI analysis and
              interview preparation.
            </p>
          </div>

          <form
            className="auth-modern-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            <button
              className="auth-submit-button"
              type="submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </span>

              {!loading && (
                <span className="auth-button-arrow">
                  →
                </span>
              )}
            </button>
          </form>

          <div className="auth-switch">
            <span>
              New to AI Job Tracker?
            </span>

            <Link to="/register">
              Create your account
            </Link>
          </div>

          <div className="auth-security-note">
            <span>◆</span>

            <p>
              Your application data stays
              inside your personal workspace.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Login;