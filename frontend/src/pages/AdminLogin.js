import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // Confirm user is admin
      if (res.data.user.role !== "admin") {
        alert("You are not an admin!");
        return;
      }

      // Store token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      background: "#f7f9fc"
    }}>
      <div style={{
        width: "350px",
        padding: "25px",
        borderRadius: "10px",
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Login
        </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#dc3545",
              color: "white",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
}
