import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ViewVoters() {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    fetchVoters();
  }, []);

  const fetchVoters = async () => {
    try {
      const res = await api.get("/admin/voters", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setVoters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold mb-6">Registered Voters</h2>

      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">Voter ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Voted?</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((v) => (
            <tr key={v._id} className="border-b">
              <td className="p-3">{v.voterId}</td>
              <td className="p-3">{v.name}</td>
              <td className="p-3">{v.email}</td>
              <td className="p-3">{v.hasVoted ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
