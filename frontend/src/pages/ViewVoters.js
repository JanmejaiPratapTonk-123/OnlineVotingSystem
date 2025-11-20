import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ViewVoters() {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVoters = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/voters");
        setVoters(res.data);
      } catch (err) {
        console.error("Error fetching voters:", err.response || err);
        alert("Failed to load voters");
      } finally {
        setLoading(false);
      }
    };

    fetchVoters();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Registered Voters</h2>

      {loading ? (
        <p>Loading voters...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Voter ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Has Voted?</th>
            </tr>
          </thead>
          <tbody>
            {voters.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center">
                  No voters found
                </td>
              </tr>
            ) : (
              voters.map((v) => (
                <tr key={v._id} className="border-b">
                  <td className="p-3">{v.voterId}</td>
                  <td className="p-3">{v.name}</td>
                  <td className="p-3">{v.email}</td>
                  <td className="p-3">{v.hasVoted ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
