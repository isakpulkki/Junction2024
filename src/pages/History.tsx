
import AuthenticationBar from '../components/AuthenticationBar';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../App'; 

export default function HistoryPage() {



  return (
    <ThemeProvider theme={theme}>
      <AuthenticationBar />
    </ThemeProvider>
  );
}
