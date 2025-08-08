import React, { useState } from 'react';
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DashboardHeader from '../components/DashboardHeader';
import KanbanColumn from '../components/KanbanColumn';
import TaskModal from '../components/TaskModal';
import TaskCreationModal from '../components/TaskCreationModal';
import { dummyTasks } from '../dummyData';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(dummyTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
    const newTask = { ...newTaskData, id: uuidv4() };
    setTasks([...tasks, newTask]);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery) ||
    task.description.toLowerCase().includes(searchQuery)
  );

  const pendingTasks = filteredTasks.filter(task => task.status === 'Pending');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'In-Progress');
  const completedTasks = filteredTasks.filter(task => task.status === 'Completed');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#f4f5f7' }}>
      <DashboardHeader onLogout={handleLogout} onSearch={handleSearch} />
      <Box sx={{ p: 4, flexGrow: 1, display: 'flex', gap: 3, overflowX: 'auto' }}>
        <KanbanColumn status="Pending" tasks={pendingTasks} onTaskClick={handleTaskClick} />
        <KanbanColumn status="In-Progress" tasks={inProgressTasks} onTaskClick={handleTaskClick} />
        <KanbanColumn status="Completed" tasks={completedTasks} onTaskClick={handleTaskClick} />
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