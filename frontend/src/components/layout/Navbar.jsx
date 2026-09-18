import {
  useEffect,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleThemeToggle = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          AI
        </div>

        <div className="brand-text">
          <span>CareerAI</span>
          <small>JOB INTELLIGENCE</small>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-navigation">

        <span className="sidebar-label">
          WORKSPACE
        </span>

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            ◫
          </span>

          <span>Overview</span>
        </NavLink>

        <NavLink
          to="/jobs"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            ▣
          </span>

          <span>Applications</span>
        </NavLink>

        <span className="sidebar-label sidebar-label-spaced">
          AI CAREER TOOLS
        </span>

        <NavLink
          to="/ai-tools"
          className="sidebar-link"
        >
          <span className="sidebar-icon">
            ✦
          </span>

          <span>AI Workspace</span>
        </NavLink>

      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">

        <div className="sidebar-ai-card">
          <span className="sidebar-ai-label">
            AI ASSISTANT
          </span>

          <strong>
            Improve your next application
          </strong>

          <p>
            Analyze job descriptions, match
            your resume and prepare for
            interviews.
          </p>

          <NavLink to="/ai-tools">
            Open AI Workspace →
          </NavLink>
        </div>

        <button
          className="sidebar-theme"
          onClick={handleThemeToggle}
        >
          <span>
            {darkMode ? "☀" : "☾"}
          </span>

          <span>
            {darkMode
              ? "Light mode"
              : "Dark mode"}
          </span>
        </button>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Navbar;