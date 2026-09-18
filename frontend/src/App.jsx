import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard";

import Jobs from "./pages/jobs/Jobs";
import AddJob from "./pages/jobs/AddJob";
import EditJob from "./pages/jobs/EditJob";
import JobDetails from "./pages/jobs/JobDetails";

import AiTools from "./pages/ai/AiTools";

import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedLayout from "./components/layout/ProtectedLayout";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/add" element={<AddJob />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/jobs/:id/edit" element={<EditJob />} />

          <Route path="/ai-tools" element={<AiTools />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;