import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('admin_token') === 'valid';
  return isAuthenticated ? children : <Navigate to="/schooleventcalendar/adminlogin" />;
}
