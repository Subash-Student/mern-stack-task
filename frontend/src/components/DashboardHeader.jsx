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
import RefreshIcon from '@mui/icons-material/Refresh'; // ✅ added
import { TaskContext } from '../context/TaskContext';

const DashboardHeader = () => {
  const { user, logOut, setFilterOption } = useContext(TaskContext); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dueDate: ''
  });
  const open = Boolean(anchorEl);

  // User Menu
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Filter Modal
  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setFilterOption(filters); 
    handleFilterClose();
  };

  // ✅ Reset Filters
  const handleResetFilters = () => {
    const resetValues = { status: '', dueDate: '' };
    setFilters(resetValues);
    setFilterOption(resetValues);
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TaskFlow
          </Typography>

          {/* Filter Button */}
          <IconButton
            color="primary"
            sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' }, mr: 1 }}
            onClick={handleFilterOpen}
          >
            <FilterListIcon />
          </IconButton>

          {/* ✅ Reset Button */}
          <IconButton
            color="secondary"
            sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' }, mr: 2 }}
            onClick={handleResetFilters}
          >
            <RefreshIcon />
          </IconButton>

          {/* Avatar Menu */}
          <IconButton size="large" onClick={handleMenu} color="inherit">
            <Avatar>
              {user?.userName ? user.userName.charAt(0).toUpperCase() : 'U'}
            </Avatar>
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
            <MenuItem onClick={logOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Filter Modal */}
      <Dialog open={filterOpen} onClose={handleFilterClose}>
        <DialogTitle>Filter Tasks</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Filter by Status */}
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              label="Status"
            >
              <SelectItem value="">All</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In-Progress">In-Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </Select>
          </FormControl>

          {/* Filter by Due Date */}
          <TextField
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={filters.dueDate}
            onChange={(e) => handleFilterChange('dueDate', e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterClose}>Cancel</Button>
          <Button onClick={applyFilters} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardHeader;
