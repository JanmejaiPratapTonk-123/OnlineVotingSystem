import axios from 'axios';

const API = axios.create({ 
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'  // Use env var for flexibility
});

export const loginUser  = (data) => API.post('/auth/login', data);
export const VerifyOTP = (data) => API.post('/auth/verify-otp', data);
// In frontend/src/services/api.js
export const registerUser  = (data) => API.post('/auth/register', data);
// verifyOTP already defined for Login.js

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Auth API Calls
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Registration failed' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Login failed' };
  }
};

export const verifyOTP = async (otpData) => {
  try {
    const response = await API.post('/auth/verify-otp', otpData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'OTP verification failed' };
  }
};

// Vote API Calls
export const castVote = async (voteData) => {
  try {
    const response = await API.post('/vote', voteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Vote casting failed' };
  }
};

export const getHasVoted = async () => {
  try {
    // Assuming a backend route to check user's vote status (add if needed: GET /vote/status)
    const response = await API.get('/vote/status');
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to check vote status' };
  }
};

// Admin API Calls
export const addCandidate = async (candidateData) => {
  try {
    const response = await API.post('/admin/candidates', candidateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to add candidate' };
  }
};

export const getCandidates = async () => {
  try {
    const response = await API.get('/admin/candidates');  // Add this route in backend if needed
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to fetch candidates' };
  }
};

export const updateCandidate = async (id, candidateData) => {
  try {
    const response = await API.put(`/admin/candidates/${id}`, candidateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to update candidate' };
  }
};

export const deleteCandidate = async (id) => {
  try {
    const response = await API.delete(`/admin/candidates/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to delete candidate' };
  }
};

// Results API Calls (Admin-only, but can be public for candidates)
export const getResults = async () => {
  try {
    const response = await API.get('/results');
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to fetch results' };
  }
};

// Generic call for candidates list (public, for voting page)
export const getAllCandidates = async () => {
  try {
    // Backend route: GET /candidates (add in backend/routes if needed, no auth)
    const response = await API.get('/candidates');
    return response.data;
  } catch (error) {
    throw error.response?.data || { msg: 'Failed to fetch candidates' };
  }
};