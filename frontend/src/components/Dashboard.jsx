import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Menu, MenuItem, Box, Button } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import KanbanBoard from "./KanbanBoard";
import TaskCreateModal from "./TaskCreateModal";
import { tasks as dummyTasks } from "../data/tasks";

export default function Dashboard({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [tasks, setTasks] = useState(dummyTasks);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">TaskFlow</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Search />
            <IconButton color="inherit" onClick={() => setCreateOpen(true)}>
              <Add />
            </IconButton>
            <Avatar onClick={(e) => setAnchorEl(e.currentTarget)} />
          </Box>
        </Toolbar>
      </AppBar>

      <KanbanBoard tasks={tasks} setTasks={setTasks} />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>

      <TaskCreateModal open={createOpen} onClose={() => setCreateOpen(false)} setTasks={setTasks} />
    </>
  );
}
