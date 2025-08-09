
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {toast} from "react-toastify"
// Create the context
export const TaskContext = createContext();



// Create the provider component
export const TaskProvider = ({ children }) => {
  
    const [filterOption,setFilterOption] = useState({});
    
    

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  const value = {
    logout,filterOption,setFilterOption
  };

  return (
    <TaskContext.Provider value={value}>
      { children}
    </TaskContext.Provider>
  );
};
