import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ voters: 0, candidates: 0, votes: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/candidates">Manage Candidates</Link>
          <Link to="/admin/results">Election Results</Link>
          <Link to="/admin/voters" className="hover:text-indigo-400">View Voters</Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-600 mt-6">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Dashboard */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome, {localStorage.getItem("name")} (Admin)</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card count={stats.voters} label="Registered Voters" />
          <Card count={stats.candidates} label="Candidates" />
          <Card count={stats.votes} label="Votes Cast" />
        </div>
      </div>
    </div>
  );
}

const Card = ({ count, label }) => (
  <div className="p-6 bg-white shadow rounded-lg text-center">
    <h2 className="text-3xl font-bold">{count}</h2>
    <p className="text-gray-500">{label}</p>
  </div>
);
