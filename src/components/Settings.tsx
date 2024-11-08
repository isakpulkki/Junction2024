// Settings.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Divider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const MaskedName = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  letterSpacing: '0.1em',
}));

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationToggle = () => {
    setNotifications((prev) => !prev);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
    // Add any theme toggling logic if necessary
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box display="flex" flexDirection="column" gap={2}>
          {/* Display Name */}
          <Box>
            <Typography variant="subtitle1" color="textSecondary">
              Name
            </Typography>
            <MaskedName>
              C***GPT
            </MaskedName>
          </Box>

          {/* Notifications Toggle */}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={handleNotificationToggle}
                  color="primary"
                />
              }
              label="Enable Notifications"
            />
          </FormGroup>

          {/* Dark Mode Toggle */}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
          </FormGroup>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;