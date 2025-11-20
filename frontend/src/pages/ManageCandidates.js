import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function ManageCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/candidates");
      setCandidates(res.data);
    } catch (err) {
      console.error("Error fetching candidates:", err.response || err);
      alert("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const addCandidate = async () => {
    if (!name.trim()) return alert("Enter candidate name");
    try {
      await api.post("/admin/candidates", { name });
      setName("");
      fetchCandidates();
    } catch (err) {
      console.error("Error adding candidate:", err.response || err);
      alert(
        err.response?.data?.msg || "Failed to add candidate. Check console."
      );
    }
  };

  const deleteCandidate = async (id) => {
    try {
      await api.delete(`/admin/candidates/${id}`);
      fetchCandidates();
    } catch (err) {
      console.error("Error deleting candidate:", err.response || err);
      alert("Failed to delete candidate");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Manage Candidates</h2>

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

      {loading ? (
        <p>Loading candidates...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Name</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 ? (
              <tr>
                <td colSpan="2" className="p-3 text-center">
                  No candidates found
                </td>
              </tr>
            ) : (
              candidates.map((c) => (
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
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
