import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header({ onLoginClick }) {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          TaskFlow
        </Typography>
        {onLoginClick && (
          <Button variant="outlined" onClick={onLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
