import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

// This component can be used to protect any route that requires login
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useContext(AuthContext);
  
  if (isLoggedIn === 0) {
    // User is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }
  
  // User is logged in, render the children
  return <>{children}</>;
};

export default ProtectedRoute;