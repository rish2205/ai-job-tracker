import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function ProtectedLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;