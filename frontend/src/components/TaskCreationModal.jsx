import React, { useState, useContext } from 'react';
import {
  Modal, Box, Typography, TextField, Button, IconButton, Paper, MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TaskContext } from '../context/TaskContext';

// Modal styling
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const TaskCreationModal = ({ open, onClose }) => {
  const { createTask } = useContext(TaskContext); // Access createTask from context

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  // Create task handler
  const handleCreate = async () => {
    if (!title.trim()) return alert('Title is required'); // Validation

    await createTask({ title, description, status, dueDate }); // Save task
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('Pending');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Create New Task</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form Fields */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Title" fullWidth required value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Description" fullWidth multiline rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField label="Due Date" type="date" fullWidth required InputLabelProps={{ shrink: true }} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          <TextField select label="Status" fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </Box>

        {/* Submit Button */}
        <Button variant="contained" fullWidth sx={{ mt: 3 }} onClick={handleCreate}>
          Create Task
        </Button>
      </Paper>
    </Modal>
  );
};

export default TaskCreationModal;
