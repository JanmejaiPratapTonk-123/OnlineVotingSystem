import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/dashboard" className="hover:text-indigo-400">Dashboard</Link>
          <Link to="/admin/candidates" className="hover:text-indigo-400">Manage Candidates</Link>
          <Link to="/admin/voters" className="hover:text-indigo-400">View Voters</Link>
          <Link to="/admin/results" className="hover:text-indigo-400">Election Results</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mb-6">Welcome to the Online Voting System Admin Panel.</p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold">20</h2>
            <p className="text-gray-500">Registered Voters</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold">5</h2>
            <p className="text-gray-500">Candidates</p>
          </div>

          <div className="p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold">13</h2>
            <p className="text-gray-500">Votes Cast</p>
          </div>
        </div>
      </div>
    </div>
  );
}
