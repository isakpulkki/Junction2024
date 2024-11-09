
import { useEffect, useState } from 'react';
import AuthenticationBar from '../components/AuthenticationBar';
import Voting from '../components/Voting';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../App'; 

export default function VotingPage() {

// Tän idea fetchata data, joka löytyy data.json tiedostosta --> tähän RSS feedistä dataa
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
      <AuthenticationBar />
      <Voting items={items} />
    </ThemeProvider>
  );
}
