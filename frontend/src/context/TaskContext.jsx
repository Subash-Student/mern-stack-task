import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create a global context for tasks
export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [filterOption, setFilterOption] = useState({}); // For storing filter options
  const [tasks, setTasks] = useState([]); // All tasks list
  const [user, setUser] = useState({}); // Logged-in user data
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend API URL

  // ✅ Create Task API
  const createTask = async (taskData) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.post(
        backendUrl + '/api/tasks',
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) => [...prev, res.data]); // Add new task to state
      toast.success('Task created successfully!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
      throw error;
    }
  };

  // ✅ Update Task API
  const updateTask = async (id, updatedData) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.put(
        `${backendUrl}/api/tasks/${id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task)) // Replace updated task
      );
      toast.success('Task updated successfully!');
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
      throw error;
    }
  };

  // ✅ Delete Task API
  const deleteTask = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`${backendUrl}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id)); // Remove deleted task
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
      throw error;
    }
  };

  // ✅ Get All Tasks API
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
      setTasks(res.data.tasks); // Save tasks in state
      setUser(res.data.user); // Save logged-in user info
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  };

  // ✅ Logout function
  const logout = () => {
    sessionStorage.removeItem('token');
    toast.info('Logged out');
    window.location.href = '/';
  };

  // Context value to share with components
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
