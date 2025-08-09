import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Header = ({ onLoginClick }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          TaskFlow
        </Typography>

        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={onLoginClick}>
            Login / Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
