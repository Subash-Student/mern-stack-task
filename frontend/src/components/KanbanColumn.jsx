import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import TaskCard from './TaskCard';

const KanbanColumn = ({ status, tasks, onTaskClick }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, minWidth: 300, flex: 1 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        {status} ({tasks.length})
      </Typography>
      <Box sx={{ minHeight: 200 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
      </Box>
    </Paper>
  );
};

export default KanbanColumn;