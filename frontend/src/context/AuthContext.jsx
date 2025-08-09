import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Create authentication context
export const AuthContext = createContext();

// Backend API base URL from environment variable
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store logged-in user data
  const [token, setToken] = useState(sessionStorage.getItem("token")); // Store JWT token
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();

  // Load stored user data from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // User login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, { email, password });
      if (response.data.success) {
        // Save token in state + session storage
        setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        // Redirect after success
        setTimeout(() => {
          navigate("/dashBoard");
        }, 1500);
        return { success: true };
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  // User registration function
  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/register`, { username, email, password });
      if (response.data.success) {
        // Save token in state + session storage
        setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        // Redirect after success
        setTimeout(() => {
          navigate("/dashBoard");
        }, 1500);
        return { success: true };
      } else {
        toast.error(response.data.message);
        console.log(response);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  // Logout user and clear session
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  // Values shared with all components via context
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    token
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only after loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
