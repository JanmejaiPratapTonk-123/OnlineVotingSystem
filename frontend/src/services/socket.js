import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

let socket;

export const initSocket = (token) => {
  socket = io(SOCKET_URL, {
    auth: { token }  // Pass JWT for authenticated sockets
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('voteUpdate', (data) => {
    console.log('New vote:', data);  // Trigger UI update, e.g., refresh chart
    // Emit to context or use callback: window.dispatchEvent(new Event('voteUpdated'));
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const emitEvent = (event, data) => {
  if (socket) {
    socket.emit(event, data);
  }
};

// Usage in App.js or context: Use useEffect to init on login, disconnect on logout.