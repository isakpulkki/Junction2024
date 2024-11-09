import AuthenticationBar from './components/AuthenticationBar';
import Voting from './components/Voting';
import Settings from './components/Settings';
import SingleVoting from './components/SingleVoting';
import VotingHistory from './components/VotingHistory';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';

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

const theme = createTheme({
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
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching JSON: ', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationBar></AuthenticationBar>
      <Voting items={items}></Voting>
    </ThemeProvider>
  );
}

export default App;
