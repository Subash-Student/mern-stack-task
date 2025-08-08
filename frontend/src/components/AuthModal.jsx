import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Box,
} from "@mui/material";

export default function AuthModal({ open, onClose, onLoginSuccess }) {
  const [tab, setTab] = useState(0);

  const handleSubmit = () => {
    onLoginSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Email" fullWidth />
          <TextField label="Password" type="password" fullWidth />
          {tab === 1 && <TextField label="Confirm Password" type="password" fullWidth />}
          <Button variant="contained" onClick={handleSubmit}>
            {tab === 0 ? "Login" : "Sign Up"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
