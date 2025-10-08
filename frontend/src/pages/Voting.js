import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCandidates, castVote } from '../services/api';
import { io } from 'socket.io-client';
import VoteCard from '../components/VoteCard';

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'voter') {
      navigate('/login');
      return;
    }

    fetchCandidates();
    // Assume user.hasVoted is fetched or stored in context; for now, check via API if needed
    setHasVoted(user.hasVoted || false);

    const socket = io('http://localhost:5000');  // Update for production
    socket.on('voteUpdate', fetchCandidates);

    return () => socket.disconnect();
  }, [user, navigate]);

  const fetchCandidates = async () => {
    try {
      const response = await getCandidates();
      setCandidates(response.data || []);
    } catch (err) {
      setError('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (candidateId) => {
    if (hasVoted) {
      setError('You have already voted');
      return;
    }
    setLoading(true);
    try {
      await castVote({ candidateId });
      setHasVoted(true);
      setSelectedCandidate(candidateId);
      alert('Vote cast successfully!');
      fetchCandidates();
    } catch (err) {
      setError(err.response?.data?.msg || 'Vote failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Cast Your Vote</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Choose one candidate.</p>
          {hasVoted && <p className="mt-4 text-green-600">Thank you for voting!</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <VoteCard
              key={candidate._id}
              candidate={candidate}
              onVote={handleVote}
              disabled={hasVoted || loading}
              selected={selectedCandidate === candidate._id}
            />
          ))}
        </div>
        <div className="text-center mt-8 space-x-4">
          <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md">Logout</button>
          <Link to="/results" className="px-4 py-2 bg-blue-600 text-white rounded-md">View Results</Link>
        </div>
      </div>
    </div>
  );
};

export default Voting;