import React, { useState, useContext } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { AuthContext } from '../context/AuthContext'; // Context for authentication
import { toast } from "react-toastify" // For showing success/error messages

// Modal style
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

const AuthModal = ({ open, onClose }) => {
  // Local states for tab, form fields
  const [value, setValue] = useState(0); // 0 = Login, 1 = Sign Up
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get login & register functions from AuthContext
  const { login, register } = useContext(AuthContext);

  // Handle tab change (Login <-> Sign Up)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Clear form fields when switching tabs
    setUsername('');
    setEmail('');
    setPassword('');
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === 0) { // Login
      const result = await login(email, password);
      if (result.success) {
        onClose(); // Close modal on success
      } else {
        toast.error(result.error); // Show error message
      }
    } else { // Sign Up
      const result = await register(username, email, password);
      if (result.success) {
        onClose();
      } else {
        toast.error(result.error);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={style}>
        {/* Tabs for switching between Login and Sign Up */}
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography variant="h6" align="center">
            {value === 0 ? 'Welcome Back!' : 'Join Today!'}
          </Typography>

          {/* Username field only for Sign Up */}
          {value === 1 && (
            <TextField
              label="Username"
              type="text"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          {/* Email input */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit button */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {value === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AuthModal;
