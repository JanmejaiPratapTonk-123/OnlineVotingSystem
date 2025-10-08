import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  getCandidates, 
  addCandidate, 
  deleteCandidate, 
  getResults 
} from '../services/api';  // API functions (add deleteCandidate if missing)
import { io } from 'socket.io-client';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ name: '', party: '', symbol: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingCandidate, setAddingCandidate] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();

    // Socket.IO for real-time updates
    const socket = io('http://localhost:5000');  // Update for production
    socket.on('voteUpdate', fetchData);

    return () => socket.disconnect();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [candsRes, resRes] = await Promise.all([getCandidates(), getResults()]);
      setCandidates(candsRes.data || []);
      setResults(resRes.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load data: ' + (err.response?.data?.msg || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    if (!newCandidate.name || !newCandidate.party) {
      setError('Name and party are required');
      return;
    }
    setAddingCandidate(true);
    try {
      await addCandidate(newCandidate);
      setNewCandidate({ name: '', party: '', symbol: '' });
      fetchData();  // Refresh list
      setError('');
    } catch (err) {
      setError('Failed to add candidate: ' + (err.response?.data?.msg || err.message));
    } finally {
      setAddingCandidate(false);
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;
    try {
      await deleteCandidate(candidateId);
      fetchData();  // Refresh
    } catch (err) {
      setError('Failed to delete candidate');
    }
  };

  const handleChange = (e) => {
    setNewCandidate({ ...newCandidate, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Manage candidates, voters, and view live election results
          </p>
          {error && (
            <p className="mt-4 px-4 py-2 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:border-red-600 dark:text-red-300">
              {error}
            </p>
          )}
          <div className="mt-4 space-x-4">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
            <Link
              to="/results"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View Public Results
            </Link>
          </div>
        </div>

        {/* Add Candidate Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Add New Candidate
          </h2>
          <form onSubmit={handleAddCandidate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Candidate Name"
              value={newCandidate.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <input
              name="party"
              type="text"
              placeholder="Party Name"
              value={newCandidate.party}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
            <input
              name="symbol"
              type="text"
              placeholder="Symbol URL (optional)"
              value={newCandidate.symbol}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              disabled={addingCandidate}
              className="md:col-span-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {addingCandidate ? 'Adding...' : 'Add Candidate'}
            </button>
          </form>
        </div>

        {/* Candidates List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Candidates List
            </h2>
            {candidates.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No candidates yet. Add one above!</p>
            ) : (
              <ul className="space-y-4">
                {candidates.map((cand) => (
                  <li
                    key={cand._id}
                    className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-md"
                  >
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">{cand.name}</span>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">({cand.party})</span>
                      {cand.symbol && (
                        <img src={cand.symbol} alt="Symbol" className="h-6 w-6 ml-2 inline" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Votes: {cand.votes || 0}
                      </span>
                      <button
                        onClick={() => handleDeleteCandidate(cand._id)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Results Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Live Vote Results
            </h2>
            {results.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No votes yet.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={results} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="votes" fill="#8884d8" name="Votes" />
                </BarChart>
              </ResponsiveContainer>
            )}
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Total Votes: {results.reduce((sum, r) => sum + r.votes, 0)}
            </p>
          </div>
        </div>

        {/* Additional Admin Actions (Optional: Manage Voters) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Manage Voters (Coming Soon)
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            View registered voters, verify, or reset votes. Implement via additional API routes.
          </p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;