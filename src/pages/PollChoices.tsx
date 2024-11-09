import { useEffect, useState } from 'react';
import AuthenticationBar from '../components/AuthenticationBar';
import Polls from '../components/Polls';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../App';

export default function PollChoicesPage() {
  // Tän idea fetchata data, joka löytyy data.json tiedostosta --> tähän RSS feedistä dataa
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setPolls(data);
      })
      .catch((error) => {
        console.error('Error fetching JSON: ', error);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationBar />
      <Polls polls={polls} />
    </ThemeProvider>
  );
}
