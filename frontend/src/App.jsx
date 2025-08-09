import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/src/components/ProtectedRoute';
import { TaskProvider } from './context/TaskContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1',
    },
    secondary: {
      main: '#7e57c2',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />     
       <Router>
        <AuthProvider>
          <TaskProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
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