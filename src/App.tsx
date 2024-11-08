import AuthenticationBar from './components/AuthenticationBar'
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    dark: {palette: {
      primary: {main: '#f5f5f5'},
    }},
}, typography: {
  fontFamily: 'monospace',
  button: {
    textTransform: "none",
    fontFamily: 'monospace',
    letterSpacing: '.1rem'
  }
} 
});

function App() {

  return (
     <ThemeProvider theme={theme}>
    <AuthenticationBar></AuthenticationBar>
      </ThemeProvider>
  )
}

export default App
