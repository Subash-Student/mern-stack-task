import React, { useState, useContext, useEffect } from 'react';
import { Box, Fab, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardHeader from '../components/DashboardHeader';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import TaskCreationModal from '../components/TaskCreationModal';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';

const DashboardPage = () => {
  const navigate = useNavigate();

  // Local state management
  const [selectedTask, setSelectedTask] = useState(null); // Track which task is selected
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // Show/Hide Task Detail Modal
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false); // Show/Hide Task Creation Modal
  const [searchQuery, setSearchQuery] = useState(''); // Store search input

  // Get context data and methods from TaskContext
  const { filterOption, tasks, setTasks, getAllTasks } = useContext(TaskContext);

  // Fetch all tasks when component mounts
  useEffect(() => {
    getAllTasks();
  }, []);

  // Handle clicking a task card → open task detail modal
  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  // Close task modal
  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  // Update task after saving edits
  const handleSaveTask = (updatedTask) => {
    setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
  };

  // Delete task by ID
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  // Add a new task
  const handleCreateTask = (newTaskData) => {
    const newTask = { ...newTaskData, status: 'Pending' }; // Default status: Pending
    setTasks([...tasks, newTask]);
  };

  // Logout → navigate to home page
  const handleLogout = () => {
    navigate('/');
  };

  // Store search query
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filter tasks based on status and due date
  const filteredTasks = tasks.filter(task => {
    const matchesStatus =
      !filterOption.status || task.status === filterOption.status;

    const matchesDueDate =
      !filterOption.dueDate || task.dueDate.slice(0, 10) === filterOption.dueDate;

    return matchesStatus && matchesDueDate;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f4f5f7' }}>
      
      {/* Header with Search and Logout */}
      <DashboardHeader onLogout={handleLogout} onSearch={handleSearch} />
      
      {/* Main content area */}
      <Box sx={{ p: 4, flexGrow: 1, overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          All Tasks
        </Typography>

        {/* Task Cards Grid */}
        <Grid container spacing={3}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={task._id}>
                <TaskCard task={task} onClick={handleTaskClick} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" color="text.secondary" align="center">
                No tasks found.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskModal
          open={isTaskModalOpen}
          onClose={handleTaskModalClose}
          task={selectedTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      {/* Task Creation Modal */}
      <TaskCreationModal
        open={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onCreate={handleCreateTask}
      />

      {/* Floating Action Button → Opens Task Creation Modal */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => setIsCreationModalOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default DashboardPage;
