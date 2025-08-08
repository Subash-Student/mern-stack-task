import React from "react";
import { Card, CardContent, Typography, Chip, Tooltip, Stack } from "@mui/material";

export default function TaskCard({ task }) {
  const dueColor = new Date(task.due) < new Date() ? "error" : "success";

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <Tooltip title={task.description} arrow>
      <Card sx={{ mt: 1 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {task.title}
          </Typography>

          {/* Due Date Chip */}
          <Chip
            label={`Due: ${formatDate(task.due)}`}
            color={dueColor}
            size="small"
            sx={{ mt: 1 }}
          />

          {/* Created / Updated Dates */}
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Created: {formatDate(task.createdAt)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Updated: {formatDate(task.updatedAt)}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Tooltip>
  );
}
