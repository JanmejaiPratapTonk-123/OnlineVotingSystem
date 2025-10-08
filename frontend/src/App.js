import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';  // Define this for auth checks
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Voting from './pages/Voting';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';  // Optional global nav

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />  {/* Optional: Add if you have a global navbar */}
          <Routes>
            <Route path="/" element={<Home />} />  {/* Home as root */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/voting"
              element={
                <ProtectedRoute roles={['voter']}>
                  <Voting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute roles={['voter', 'admin', 'candidate']}>
                  <Results />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;