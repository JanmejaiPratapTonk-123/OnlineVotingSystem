import axios from 'axios';

// ================================
// 🌐 Base API Configuration
// ================================
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://onlinevotingsystem-sm9y.onrender.com/api',
});

// Automatically attach JWT token (if present)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// ================================
// 🧾 AUTHENTICATION API CALLS
// ================================

// ✅ Register a new user
export const registerUser = async (data) => {
  try {
    const res = await API.post('/auth/register', data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Registration failed' };
  }
};

// ✅ Login (generates OTP if verified)
export const loginUser = async (data) => {
  try {
    const res = await API.post('/auth/login', data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Login failed' };
  }
};

// ✅ Verify OTP (used for both register & login)
export const verifyOTP = async (data) => {
  try {
    const res = await API.post('/auth/verify-otp', data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'OTP verification failed' };
  }
};

// ================================
// 🗳️ VOTING API CALLS
// ================================

// ✅ Cast a vote
export const castVote = async (voteData) => {
  try {
    const res = await API.post('/vote', voteData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to cast vote' };
  }
};

// ✅ Check if user has already voted
export const getHasVoted = async () => {
  try {
    const res = await API.get('/vote/status');
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to fetch voting status' };
  }
};

// ================================
// 🧑‍💼 ADMIN API CALLS
// ================================

// ✅ Add a candidate
export const addCandidate = async (candidateData) => {
  try {
    const res = await API.post('/admin/candidates', candidateData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to add candidate' };
  }
};

// ✅ Get all candidates (admin)
export const getCandidates = async () => {
  try {
    const res = await API.get('/admin/candidates');
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to fetch candidates' };
  }
};

// ✅ Update candidate
export const updateCandidate = async (id, candidateData) => {
  try {
    const res = await API.put(`/admin/candidates/${id}`, candidateData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to update candidate' };
  }
};

// ✅ Delete candidate
export const deleteCandidate = async (id) => {
  try {
    const res = await API.delete(`/admin/candidates/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to delete candidate' };
  }
};

// ================================
// 📊 RESULTS & PUBLIC DATA
// ================================

// ✅ Fetch voting results
export const getResults = async () => {
  try {
    const res = await API.get('/results');
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to fetch results' };
  }
};

// ✅ Fetch all candidates (public, for voters)
export const getAllCandidates = async () => {
  try {
    const res = await API.get('/candidates');
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Failed to fetch candidate list' };
  }
};

// ================================
// ⚙️ Optional Utility Helpers
// ================================

// Alternate registration (used for older components)
export const register = async (userData) => {
  try {
    const res = await API.post('/auth/register', userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Registration failed' };
  }
};

// Alternate login (used for older components)
export const login = async (credentials) => {
  try {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Login failed' };
  }
};

export default API;
