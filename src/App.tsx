import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VotingMainPage from './pages/Voting';
import HistoryPage from './pages/History';
import PollPage from './pages/Poll';
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
    fontFamily: 'monospace',
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
        <Route path="/" element={<VotingMainPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/poll" element={<PollPage />} />
      </Routes>
    </Router>
  );
}

export default App;
