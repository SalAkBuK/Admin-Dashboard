import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('token'); // Adjust the condition based on your logic

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return <Outlet />; // Render child routes if authenticated
};

export default PrivateRoute;
