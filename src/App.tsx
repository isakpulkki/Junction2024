import { createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VotingMainPage from './pages/Voting';
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
    light: {
      palette: {
        primary: { main: '#ffffff' },
        secondary: { main: '#ffffff' },
        info: { main: '#003580' }
      },
    },
  },
  typography: {
    allVariants: {
      color: 'black'
    },
    fontFamily: 'DM Sans, sans-serif', // Set DM Sans as default font
    button: {
      textTransform: 'none',
      fontFamily: 'DM Sans, sans-serif',
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
        <Route path="/authentication" element={<AuthenticationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
