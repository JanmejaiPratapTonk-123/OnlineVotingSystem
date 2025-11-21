import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function Voting() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch candidates from backend
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await api.get("/admin/candidates");
        setCandidates(res.data);
      } catch (error) {
        console.error("Error loading candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  // Submit vote
  const castVote = async () => {
  if (!selectedCandidate) {
    return alert("Please select a candidate!");
  }
  try {
    const res = await api.post("/vote", { candidateId: selectedCandidate });
    setMessage(res.data.msg || "Vote cast successfully!");
  } catch (error) {
    setMessage(error.response?.data?.msg || "Failed to cast vote.");
  }
};


  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Cast Your Vote</h2>
      <p className="mb-6 text-gray-600">Choose one candidate.</p>

      {message && <p className="text-green-600 font-semibold">{message}</p>}

      <div className="flex flex-col items-center gap-3 mb-6">
        {candidates.length === 0 ? (
          <p>No candidates available.</p>
        ) : (
          candidates.map((c) => (
            <label key={c._id} className="border rounded p-2 w-1/3 flex justify-between items-center">
              <span>{c.name}</span>
              <input
                type="radio"
                name="candidate"
                value={c._id}
                onChange={() => setSelectedCandidate(c._id)}
              />
            </label>
          ))
        )}
      </div>

      <button
        onClick={castVote}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Submit Vote
      </button>
    </div>
  );
}
