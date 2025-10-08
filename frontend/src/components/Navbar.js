import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              Online Voting
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  Login
                </Link>
                <Link to="/register" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  Register
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-700 dark:text-gray-300">Welcome, {user.name}</span>
                <Link to="/voting" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  Vote
                </Link>
                <Link to="/results" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                  Results
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-red-600 hover:text-red-800">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;