import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
} from '@mui/material';

const TaskCard = ({ task, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getDueDateColor = (date) => {
    const now = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 3 && diffDays >= 0) return theme.palette.success.main;
    if (diffDays < 0) return theme.palette.error.main;
    return theme.palette.primary.main;
  };

  const dueDateColor = getDueDateColor(task.dueDate);

  return (
    <Card
      sx={{
        mb: 2,
        cursor: 'pointer',
        borderLeft: `5px solid ${dueDateColor}`,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: theme.shadows[4],
        },
      }}
      onClick={() => onClick(task)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent>
        <Typography variant="subtitle1" component="h3">
          {task.title}
        </Typography>
        {isHovered && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {task.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;