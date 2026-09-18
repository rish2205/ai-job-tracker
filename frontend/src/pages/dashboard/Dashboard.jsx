import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import Loader from "../../components/common/Loader";
import { getDashboard } from "../../services/jobService";

const STATUS_COLORS = {
  Applied: "#2563eb",
  Assessment: "#7c3aed",
  Interview: "#f59e0b",
  Offer: "#16a34a",
  Rejected: "#dc2626",
};

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const result =
          await getDashboard();

        setData(result);
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const chartData = useMemo(() => {
    if (!data) {
      return [];
    }

    return [
      {
        name: "Applied",
        value: data.applied,
      },
      {
        name: "Assessment",
        value: data.assessments,
      },
      {
        name: "Interview",
        value: data.interviews,
      },
      {
        name: "Offer",
        value: data.offers,
      },
      {
        name: "Rejected",
        value: data.rejections,
      },
    ].filter(
      (item) => item.value > 0
    );
  }, [data]);

  const activeApplications = useMemo(() => {
    if (!data) {
      return 0;
    }

    return (
      data.applied +
      data.assessments +
      data.interviews
    );
  }, [data]);

  const progressPercentage = useMemo(() => {
    if (!data || data.totalApplications === 0) {
      return 0;
    }

    const progressed =
      data.assessments +
      data.interviews +
      data.offers;

    return Math.round(
      (progressed /
        data.totalApplications) *
        100
    );
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <section className="page dashboard-page">

      {/* HERO */}

      <div className="dashboard-hero">

        <div>
          <span className="dashboard-eyebrow">
            CAREER WORKSPACE
          </span>

          <h1>
            Your job search,
            <br />
            organized in one place.
          </h1>

          <p>
            Track every application,
            monitor your progress and use
            AI to prepare for the next
            opportunity.
          </p>
        </div>

        <div className="dashboard-hero-actions">
          <Link
            to="/ai-tools"
            className="dashboard-secondary-button"
          >
            ✦ AI Workspace
          </Link>

          <Link
            to="/jobs/add"
            className="primary-button"
          >
            + Add Application
          </Link>
        </div>

      </div>


      {/* METRICS */}

      <div className="dashboard-section-heading">
        <div>
          <span>OVERVIEW</span>
          <h2>Application metrics</h2>
        </div>

        <Link to="/jobs">
          View all applications →
        </Link>
      </div>


      <div className="dashboard-metrics">

        <div className="metric-card metric-total">
          <div className="metric-top">
            <span className="metric-icon">
              ▣
            </span>

            <span className="metric-label">
              Total Applications
            </span>
          </div>

          <strong>
            {data.totalApplications}
          </strong>

          <p>
            Applications tracked
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-dot applied-dot" />

            <span className="metric-label">
              Applied
            </span>
          </div>

          <strong>
            {data.applied}
          </strong>

          <p>
            Awaiting next step
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-dot assessment-dot" />

            <span className="metric-label">
              Assessment
            </span>
          </div>

          <strong>
            {data.assessments}
          </strong>

          <p>
            Tests and assessments
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-dot interview-dot" />

            <span className="metric-label">
              Interview
            </span>
          </div>

          <strong>
            {data.interviews}
          </strong>

          <p>
            Interview opportunities
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-dot offer-dot" />

            <span className="metric-label">
              Offers
            </span>
          </div>

          <strong>
            {data.offers}
          </strong>

          <p>
            Successful outcomes
          </p>
        </div>


        <div className="metric-card">
          <div className="metric-top">
            <span className="metric-dot rejected-dot" />

            <span className="metric-label">
              Rejected
            </span>
          </div>

          <strong>
            {data.rejections}
          </strong>

          <p>
            Closed applications
          </p>
        </div>

      </div>


      {/* ANALYTICS */}

      <div className="dashboard-content-grid">

        <div className="dashboard-chart-card">

          <div className="dashboard-card-header">
            <div>
              <span>
                PIPELINE
              </span>

              <h2>
                Application status
              </h2>
            </div>

            <span className="dashboard-card-badge">
              {data.totalApplications} total
            </span>
          </div>


          {chartData.length > 0 ? (
            <div className="dashboard-chart-content">

              <div className="dashboard-chart">

                <ResponsiveContainer
                  width="100%"
                  height={290}
                >
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={75}
                      outerRadius={108}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {chartData.map(
                        (entry) => (
                          <Cell
                            key={entry.name}
                            fill={
                              STATUS_COLORS[
                                entry.name
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="chart-center">
                  <strong>
                    {data.totalApplications}
                  </strong>

                  <span>
                    Applications
                  </span>
                </div>

              </div>


              <div className="chart-legend">

                {chartData.map((item) => (
                  <div
                    className="legend-item"
                    key={item.name}
                  >
                    <div className="legend-name">
                      <span
                        className="legend-dot"
                        style={{
                          background:
                            STATUS_COLORS[
                              item.name
                            ],
                        }}
                      />

                      {item.name}
                    </div>

                    <strong>
                      {item.value}
                    </strong>
                  </div>
                ))}

              </div>

            </div>
          ) : (
            <div className="dashboard-empty-chart">
              No application data yet.
            </div>
          )}

        </div>


        {/* CAREER SNAPSHOT */}

        <div className="career-snapshot">

          <div className="dashboard-card-header">
            <div>
              <span>
                SNAPSHOT
              </span>

              <h2>
                Search progress
              </h2>
            </div>
          </div>


          <div className="snapshot-highlight">
            <span>
              Active applications
            </span>

            <strong>
              {activeApplications}
            </strong>

            <p>
              Currently moving through
              your application pipeline.
            </p>
          </div>


          <div className="progress-block">

            <div className="progress-heading">
              <span>
                Applications progressed
              </span>

              <strong>
                {progressPercentage}%
              </strong>
            </div>

            <div className="dashboard-progress-track">
              <div
                className="dashboard-progress-fill"
                style={{
                  width:
                    `${progressPercentage}%`,
                }}
              />
            </div>

            <p>
              Percentage of applications
              that reached assessment,
              interview or offer stages.
            </p>

          </div>


          <div className="snapshot-divider" />


          <div className="snapshot-row">
            <div>
              <span>Interviews</span>
              <strong>
                {data.interviews}
              </strong>
            </div>

            <div>
              <span>Offers</span>
              <strong>
                {data.offers}
              </strong>
            </div>
          </div>


          <Link
            to="/ai-tools"
            className="snapshot-ai-link"
          >
            <span>✦</span>

            <div>
              <strong>
                Prepare with AI
              </strong>

              <p>
                Analyze your next role
                and generate interview
                questions.
              </p>
            </div>

            <span>→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Dashboard;