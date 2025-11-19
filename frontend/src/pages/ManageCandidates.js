import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");

  // Fetch candidates
  const fetchCandidates = async () => {
    const res = await api.get("/admin/candidates", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setCandidates(res.data);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Add candidate
  const addCandidate = async () => {
    if (!name.trim()) return alert("Enter candidate name");
    await api.post(
      "/admin/candidates",
      { name },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setName("");
    fetchCandidates();
  };

  // Delete candidate
  const deleteCandidate = async (id) => {
    await api.delete(`/admin/candidates/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchCandidates();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Manage Candidates</h2>

      {/* Add Candidate */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border p-2 rounded w-1/3"
          placeholder="Enter Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addCandidate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Candidate
        </button>
      </div>

      {/* Candidates Table */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Name</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c._id} className="border-b">
              <td className="p-3">{c.name}</td>
              <td className="p-3">
                <button
                  onClick={() => deleteCandidate(c._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
