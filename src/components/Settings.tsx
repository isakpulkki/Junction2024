// Settings.tsx
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Switch,
  FormControlLabel,
  FormGroup,
  Button,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  return (
    <Container>
      <Typography variant="h5">Settings</Typography>

      {/* Name */}
      <Typography variant="subtitle1">Name</Typography>
      <Typography variant="body1">Jaakko ********</Typography>

      {/* Notifications Toggle */}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
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
              onChange={() => setDarkMode(!darkMode)}
            />
          }
          label="Dark Mode"
        />
      </FormGroup>

      {/* Language Selection with White Background */}
      <Typography variant="subtitle1">Language</Typography>
      <Box sx={{ backgroundColor: 'white', borderRadius: 1 }}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value as string)}
          fullWidth
        >
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Finnish">Finnish</MenuItem>
          <MenuItem value="Swedish">Swedish</MenuItem>
        </Select>
      </Box>

      {/* Log Out Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => alert('Logged out')}
        sx={{ mt: 2 }}
      >
        Log Out
      </Button>
    </Container>
  );
};

export default Settings;
