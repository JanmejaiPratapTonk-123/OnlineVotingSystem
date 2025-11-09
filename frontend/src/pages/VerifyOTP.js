import React, { useState } from "react";
import { verifyOTP } from "../services/api";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOTP({ email, otp });
      localStorage.setItem("token", res.token);
      setMessage("✅ Verification successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.msg || "❌ Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-indigo-600">Verify OTP</h2>
        <p className="text-gray-500 text-center mb-6">Enter your email and OTP to verify your account</p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your registered email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter OTP"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Verify OTP
          </button>
        </form>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}

        <p className="text-center text-sm text-gray-500 mt-4">
          Already verified?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline font-medium"
          >
            Go to Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
