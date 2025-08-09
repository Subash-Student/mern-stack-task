import React, { useState, useContext } from 'react';
import { Box, Fab, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardHeader from '../components/DashboardHeader';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import TaskCreationModal from '../components/TaskCreationModal';
import { dummyTasks } from '../dummyData';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '../context/TaskContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(dummyTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get filter options from TaskContext
  const { filterOption } = useContext(TaskContext);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleTaskModalClose = () => {
    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (updatedTask) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleCreateTask = (newTaskData) => {
    const newTask = { ...newTaskData, id: uuidv4(), status: 'Pending' };
    setTasks([...tasks, newTask]);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Apply both search and filter
  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery);

    const matchesStatus =
      !filterOption.status || task.status === filterOption.status;

    const matchesDueDate =
      !filterOption.dueDate || task.dueDate === filterOption.dueDate;

    return matchesSearch && matchesStatus && matchesDueDate;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f4f5f7' }}>
      <DashboardHeader onLogout={handleLogout} onSearch={handleSearch} />
      
      <Box sx={{ p: 4, flexGrow: 1, overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          All Tasks
        </Typography>
        <Grid container spacing={3}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
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

      {selectedTask && (
        <TaskModal
          open={isTaskModalOpen}
          onClose={handleTaskModalClose}
          task={selectedTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      <TaskCreationModal
        open={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onCreate={handleCreateTask}
      />

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
