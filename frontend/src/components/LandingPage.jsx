import React, { useState } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Header from "./Header";
import AuthModal from "./AuthModal";

export default function LandingPage({ onLoginSuccess }) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Header onLoginClick={() => setAuthOpen(true)} />
      <Container maxWidth="md" sx={{ textAlign: "center", mt: 8 }}>
        <img src="/assets/illustration.svg" alt="Productivity" width="300" />
        <Typography variant="h3" sx={{ mt: 4, fontWeight: "bold" }}>
          Organize Your Life. Achieve Your Goals.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary" }}>
          Stay on top of tasks with our modern Kanban board system.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={() => setAuthOpen(true)}
        >
          Get Started
        </Button>
      </Container>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </>
  );
}
