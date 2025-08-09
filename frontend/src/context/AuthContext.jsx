import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"

export const AuthContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/login`, { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashBoard");
        }, 1500); 
        return { success: true };
      }else{
        toast.error(response.data.message)
        console.log(response)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/register`, { username, email, password });
      if (response.data.success) {
        setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/dashBoard");
        }, 1500); 
        return { success: true };
      }else{
        toast.error(response.data.message)
        console.log(response)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

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
      {!loading && children}
    </AuthContext.Provider>
  );
};