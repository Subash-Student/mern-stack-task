import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext'; // Provides authentication state & functions
import LandingPage from './pages/LandingPage'; // Public landing page
import DashboardPage from './pages/DashboardPage'; // Protected dashboard page
import { ToastContainer } from 'react-toastify'; // For toast notifications
import ProtectedRoute from './components/src/components/ProtectedRoute'; // Restricts access to authenticated users
import { TaskProvider } from './context/TaskContext'; // Provides task data & functions

// MUI theme customization
const theme = createTheme({
  palette: {
    primary: { main: '#5e35b1' },
    secondary: { main: '#7e57c2' },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}> {/* Apply global MUI theme */}
      <CssBaseline /> {/* Normalize default browser styles */}
      <ToastContainer /> {/* Display toast notifications globally */}

      <Router>
        {/* Wrap app with AuthProvider so auth state is accessible anywhere */}
        <AuthProvider>
          {/* Wrap with TaskProvider so task state is accessible anywhere */}
          <TaskProvider>
            <Routes>
              {/* Public route */}
              <Route path="/" element={<LandingPage />} />

              {/* Protected route - only logged-in users can access */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
              </Route>
            </Routes>
          </TaskProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
