import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PollChoicesPage from './pages/PollChoices';
import HistoryPage from './pages/History';
import PollPage from './pages/Poll';
import AuthenticationPage from './pages/Authentication';
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const theme = createTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: { main: '#f5f5f5' },
      },
    },
  },
  typography: {
    fontFamily: 'sans-serif',
    button: {
      textTransform: 'none',
      fontFamily: 'monospace',
      letterSpacing: '.1rem',
    },
  },
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PollChoicesPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/poll" element={<PollPage />} />
        <Route path="/authentication" element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
