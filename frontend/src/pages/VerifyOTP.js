import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from '../services/api';
import { useAuth } from '../context/AuthContext';

const VerifyOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await verifyOTP({
        email: email.trim(),
        otp: otp.trim(),
      });

      if (response.token) {
        setSuccess('✅ Account verified successfully!');
        // Save login session
        login(response.user, response.token);

        // Redirect after short delay
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError('Invalid OTP or verification failed');
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
        err.msg ||
        'OTP verification failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Verify Your Account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-sm text-center mt-2">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
