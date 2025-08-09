import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [filterOption, setFilterOption] = useState({});
  const [tasks, setTasks] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
 const [user,setUser] = useState({});
  // Create Task
  const createTask = async (taskData) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post(
        backendUrl + '/api/tasks',
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) => [...prev, res.data]);
      toast.success('Task created successfully!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };


  const updateTask = async (id, updatedData) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.put(
        `${backendUrl}/api/tasks/${id}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      toast.success('Task updated successfully!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

 
  const deleteTask = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${backendUrl}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

 
  const getAllTasks = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('No token found. Please login again.');
        logout();
        return;
      }

      const res = await axios.get(backendUrl + '/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data.tasks);
      setUser(res.data.user)
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    toast.info('Logged out');
    window.location.href = '/';
  };

  const value = {
    filterOption,
    setFilterOption,
    tasks,
    setTasks,
    createTask,
    updateTask,
    deleteTask,
    getAllTasks,
    logout,
    user
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
