import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  Chip
} from '@mui/material';

const TaskCard = ({ task, onClick }) => {
  const theme = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const createdDate = new Date().toLocaleDateString();
  const updatedDate = new Date().toLocaleDateString();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'primary';
      case 'In-Progress':
        return 'warning';
      case 'Completed':
        return 'success';
      default:
        return 'default';
    }
  };

  const getBorderColor = (status) => {
    switch (status) {
      case 'Pending':
        return theme.palette.primary.main;
      case 'In-Progress':
        return theme.palette.warning.main;
      case 'Completed':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const statusColor = getStatusColor(task.status);
  const borderColor = getBorderColor(task.status);

  return (
    <Box
      sx={{
        perspective: '1000px', // Needed for 3D effect
        width: 250,
        height: 200
      }}
      onClick={() => onClick(task)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderLeft: `5px solid ${borderColor}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          onClick={() => onClick(task)}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="subtitle1" component="h3" fontWeight="bold">
                {task.title}
              </Typography>
              <Chip label={task.status} color={statusColor} size="small" />
            </Box>
            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Typography variant="caption" color="text.secondary" display="block">
                Created: {createdDate}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                Updated: {updatedDate}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Back Side */}
        <Card
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: theme.palette.grey[100],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2
          }}
        >
          <Typography variant="body2" color="text.secondary" align="center">
            {task.description}
          </Typography>
        </Card>
      </Box>
    </Box>
  );
};

export default TaskCard;
