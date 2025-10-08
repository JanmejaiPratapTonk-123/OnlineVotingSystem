import React, { useEffect } from 'react';
import { initSocket, disconnectSocket } from '../services/socket';
import { useAuth } from '../context/AuthContext';

const Results = () => {
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      const sock = initSocket(token);
      // Listen for updates
      return () => disconnectSocket();
    }
  }, [token]);

  return <div>Results Page</div>;
};

export default Results;