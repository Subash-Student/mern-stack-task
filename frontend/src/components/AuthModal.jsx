import React, { useState } from 'react';
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
  const [value, setValue] = useState(0); // 0 for Login, 1 for Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === 0) {
      console.log('Login with:', { email, password });
    } else {
      console.log('Sign Up with:', { email, password });
    }
    onClose();
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