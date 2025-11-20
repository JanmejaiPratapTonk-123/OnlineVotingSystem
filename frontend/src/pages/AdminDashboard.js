import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <Link to="/admin/voters">Manage Voters</Link>
          <Link to="/admin/candidates">Manage Candidates</Link>
          <Link to="/results">View Results</Link>
          <Link to="/admin/dashboard">Dashboard Home</Link>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <h1>Welcome Admin</h1>
        <p>Select an option from the sidebar to manage the system.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
