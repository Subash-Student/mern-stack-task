import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useContext(AuthContext); // Get auth state

  // Show loader while checking auth
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // If logged in → show page, else redirect
  return !!token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
