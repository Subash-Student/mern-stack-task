// KanbanBoard.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

export default function KanbanBoard({ tasks, setTasks }) {
  const columns = ["Pending", "In-Progress", "Completed"];

  return (
    <Box sx={{ display: "flex", gap: 2, p: 2 }}>
      {columns.map((col) => (
        <Box key={col} sx={{ flex: 1, background: "#f5f5f5", p: 2, borderRadius: 2 }}>
          <Typography variant="h6">{col}</Typography>
          {tasks.filter((t) => t.status === col).map((task) => (
  <TaskCard key={task._id} task={task} />
))}

        </Box>
      ))}
    </Box>
  );
}
