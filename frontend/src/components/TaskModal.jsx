import React, { useState, useEffect, useContext } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TaskContext } from '../context/TaskContext';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const TaskModal = ({ open, onClose, task }) => {
  const { updateTask, deleteTask } = useContext(TaskContext);
  const [editedTask, setEditedTask] = useState(task || {});

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  if (!editedTask) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e) => {
    setEditedTask((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleSave = async () => {
    await updateTask(editedTask._id,editedTask);
    onClose();
  };

  const handleDelete = async () => {
    await deleteTask(editedTask._id);
    onClose();
  };
console.log(editedTask)
  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Edit Task
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={editedTask.title || ''}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={editedTask.description || ''}
            onChange={handleInputChange}
          />
          <TextField
        label="Due Date"
        name="dueDate"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={editedTask.dueDate ? editedTask.dueDate.slice(0, 10) : ''}
        onChange={handleInputChange}
          />       
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={editedTask.status || ''}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In-Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Footer Buttons */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default TaskModal;
