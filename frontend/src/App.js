import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Voting from './pages/Voting';
import Results from './pages/Results';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import VerifyOTP from './pages/VerifyOTP';
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route path="/admin/login" element={<AdminLogin />} />

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
              path="/admin/dashboard"
              element={
                <ProtectedRoute roles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
