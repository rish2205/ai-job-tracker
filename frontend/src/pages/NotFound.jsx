import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page not-found">
      <h1>404</h1>

      <p>
        The page you're looking for doesn't exist.
      </p>

      <Link to="/dashboard">
        Go to Dashboard
      </Link>
    </section>
  );
}

export default NotFound;