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
import { AuthContext } from '../context/AuthContext'; // Import the context
import {toast} from "react-toastify"

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
  const [value, setValue] = useState(0);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useContext(AuthContext); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === 0) { 
      const result = await login(email, password);
      if (result.success) {
        onClose();
      } else {
        toast.error(result.error);
      }
    } else { 
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
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h6" align="center">
            {value === 0 ? 'Welcome Back!' : 'Join Today!'}
          </Typography>

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

          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            {value === 0 ? 'Login' : 'Sign Up'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AuthModal;