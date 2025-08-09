import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onLoginClick }) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskFlow
        </Typography>
        <Button color="inherit" onClick={onLoginClick}>
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;