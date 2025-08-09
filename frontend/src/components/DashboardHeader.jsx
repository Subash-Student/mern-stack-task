import React, { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem as SelectItem,
  TextField
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh'; 
import { TaskContext } from '../context/TaskContext';

const DashboardHeader = () => {
  // Get user info, logout, and filter setter from context
  const { user, logout, setFilterOption } = useContext(TaskContext); 
  
  // State for user menu
  const [anchorEl, setAnchorEl] = useState(null);
  
  // State for filter dialog
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Current filter values
  const [filters, setFilters] = useState({
    status: '',
    dueDate: ''
  });

  const open = Boolean(anchorEl); // Menu open state

  // Menu open/close
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Filter dialog open/close
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  // Update filter values
  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Apply selected filters
  const applyFilters = () => {
    setFilterOption(filters); 
    handleFilterClose();
  };

  // Reset filters to default
  const handleResetFilters = () => {
    const resetValues = { status: '', dueDate: '' };
    setFilters(resetValues);
    setFilterOption(resetValues);
  };

  return (
    <>
      {/* Top navigation bar */}
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TaskFlow
          </Typography>

          {/* Filter button */}
          <IconButton
            color="primary"
            sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' }, mr: 1 }}
            onClick={handleFilterOpen}
          >
            <FilterListIcon />
          </IconButton>

          {/* Reset filter button */}
          <IconButton
            color="secondary"
            sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' }, mr: 2 }}
            onClick={handleResetFilters}
          >
            <RefreshIcon />
          </IconButton>

          {/* User avatar & menu */}
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <Avatar>
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Filter dialog */}
      <Dialog open={filterOpen} onClose={handleFilterClose}>
        <DialogTitle>Filter Tasks</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          
          {/* Status dropdown */}
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              label="Status"
            >
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In-Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </Select>
          </FormControl>

          {/* Due date picker */}
          <TextField
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={filters.dueDate}
            onChange={(e) => handleFilterChange('dueDate', e.target.value)}
            fullWidth
          />
        </DialogContent>
        
        {/* Dialog actions */}
        <DialogActions>
          <Button onClick={handleFilterClose}>Cancel</Button>
          <Button onClick={applyFilters} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardHeader;
