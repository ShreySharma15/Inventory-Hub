import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return currentUser ? children : <Login />;
}

export default ProtectedRoute;
