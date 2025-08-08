import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Avatar,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const DashboardHeader = ({ onLogout, onSearch }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="transparent" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TaskFlow
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative', borderRadius: 1, bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}>
            <Box sx={{ p: 1, height: '100%', position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search tasks..."
              sx={{ pl: 5, py: 1 }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => onSearch(e.target.value)}
            />
          </Box>
        </Box>
        <IconButton size="large" onClick={handleMenu} color="inherit">
          <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;