import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";

import {
  registerUser,
} from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        "Please fill in all fields"
      );
      return;
    }

    if (formData.password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      await registerUser(formData);

      toast.success(
        "Registration successful. Please login."
      );

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-experience">
      <section className="auth-product-panel register-product-panel">
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
              FROM APPLICATION TO OFFER
            </span>

            <h1>
              One workspace for your
              entire job search.
            </h1>

            <p>
              Stop managing opportunities
              across notes, spreadsheets and
              browser tabs. Build one
              intelligent workflow around
              your applications.
            </p>
          </div>

          <div className="career-flow">

            <div className="career-flow-item">
              <div className="flow-number">
                01
              </div>

              <div>
                <strong>
                  Track Application
                </strong>

                <span>
                  Save every opportunity
                </span>
              </div>

              <div className="flow-state">
                START
              </div>
            </div>

            <div className="career-flow-line" />

            <div className="career-flow-item">
              <div className="flow-number">
                02
              </div>

              <div>
                <strong>
                  Analyze the Role
                </strong>

                <span>
                  Extract skills with AI
                </span>
              </div>

              <div className="flow-state">
                AI
              </div>
            </div>

            <div className="career-flow-line" />

            <div className="career-flow-item">
              <div className="flow-number">
                03
              </div>

              <div>
                <strong>
                  Match Your Resume
                </strong>

                <span>
                  Identify strengths and gaps
                </span>
              </div>

              <div className="flow-state">
                MATCH
              </div>
            </div>

            <div className="career-flow-line" />

            <div className="career-flow-item">
              <div className="flow-number">
                04
              </div>

              <div>
                <strong>
                  Prepare & Progress
                </strong>

                <span>
                  Interview smarter
                </span>
              </div>

              <div className="flow-state success">
                READY
              </div>
            </div>

          </div>
        </div>

        <div className="auth-background-word">
          GROW
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
              GET STARTED
            </span>

            <h2>
              Build your career workspace.
            </h2>

            <p>
              Create your account and start
              organizing applications in one
              place.
            </p>
          </div>

          <form
            className="auth-modern-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label htmlFor="name">
                Your name
              </label>

              <input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

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
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />

              <span className="auth-field-help">
                Use at least 6 characters.
              </span>
            </div>

            <button
              className="auth-submit-button"
              type="submit"
              disabled={loading}
            >
              <span>
                {loading
                  ? "Creating account..."
                  : "Create account"}
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
              Already have an account?
            </span>

            <Link to="/login">
              Sign in
            </Link>
          </div>

          <div className="auth-security-note">
            <span>◆</span>

            <p>
              Start with application tracking
              and use AI tools whenever you
              need deeper insights.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Register;