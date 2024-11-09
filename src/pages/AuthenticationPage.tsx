// AuthenticationPageWrapper.tsx
import AuthenticationBar from '../components/AuthenticationBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../App'; 
import AuthenticationPage from '../components/Authentication';

export default function AuthenticationPageWrapper() {
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationBar />
      <AuthenticationPage />
    </ThemeProvider>
  );
}