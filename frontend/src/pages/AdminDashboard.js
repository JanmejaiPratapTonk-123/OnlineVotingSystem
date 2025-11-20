import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stats, setStats] = useState({ voters: 0, candidates: 0, votes: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err.response || err);
      }
    };
    fetchStats();
  }, []);

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
        <h1>Admin Dashboard</h1>
        <p className="mb-4">Quick overview of system statistics:</p>

        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Voters</h3>
            <p>{stats.voters}</p>
          </div>
          <div className="stat-card">
            <h3>Total Candidates</h3>
            <p>{stats.candidates}</p>
          </div>
          <div className="stat-card">
            <h3>Total Votes Cast</h3>
            <p>{stats.votes}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
