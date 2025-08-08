import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Button, MenuItem } from "@mui/material";

export default function TaskCreateModal({ open, onClose, setTasks }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    due: ""
  });

  const handleSave = () => {
    const now = new Date().toISOString();
    setTasks((prev) => [
      ...prev,
      {
        _id: Date.now(),
        ...form,
        createdAt: now,
        updatedAt: now
      }
    ]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          fullWidth
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          minRows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <TextField
          select
          label="Status"
          fullWidth
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In-Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
        <TextField
          type="date"
          fullWidth
          value={form.due}
          onChange={(e) => setForm({ ...form, due: e.target.value })}
        />
        <Button variant="contained" onClick={handleSave}>
          Save Task
        </Button>
      </DialogContent>
    </Dialog>
  );
}
