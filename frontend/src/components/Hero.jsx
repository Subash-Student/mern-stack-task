import React, { useContext, useState } from 'react';
import { Box, Typography, Button, TextField, Paper } from '@mui/material';
import img from '../assets/img.jpg'; // Import the image file
import { AuthContext } from '../context/AuthContext';
import {toast} from "react-toastify"

const Hero = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login} = useContext(AuthContext);

  const handleSignUp = async(e) => {

    e.preventDefault();

    const result = await login(email, password);
      if (result.success) {
        onClose();
      } else {
        toast.error(result.error);
      }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        gap: 8,
        p: 4,
      }}
    >
      <Box sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Organize Your Life. Achieve Your Goals.
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Simple and powerful task management to help you stay on track.
        </Typography>
        {/* Render the img here */}
        <Box
          component="img"
          src={img}
          alt="Person being productive img"
          sx={{ display: { xs: 'none', md: 'block' }, maxWidth: '100%', mt: 4 }}
        />
      </Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Quick Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
            Get Started
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Hero;