import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'  // backend base URL
});

// Attach token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// -------- AUTH --------
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const verifyOTP = (data) => API.post('/auth/verify-otp', data);

// -------- VOTE --------
export const castVote = (voteData) => API.post('/vote', voteData);
export const getHasVoted = () => API.get('/vote/status');

// -------- ADMIN --------
export const addCandidate = (candidateData) => API.post('/admin/candidates', candidateData);
export const getCandidates = () => API.get('/admin/candidates');
export const updateCandidate = (id, candidateData) => API.put(`/admin/candidates/${id}`, candidateData);
export const deleteCandidate = (id) => API.delete(`/admin/candidates/${id}`);

// -------- RESULTS --------
export const getResults = () => API.get('/results');

// -------- PUBLIC CANDIDATES (for voting page) --------
export const getAllCandidates = () => API.get('/candidates');

// -------- Extra helpers (for flexibility) --------
export const register = async (userData) => {
  try {
    const res = await API.post('/auth/register', userData);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Registration failed' };
  }
};

export const login = async (credentials) => {
  try {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || { msg: 'Login failed' };
  }
};
