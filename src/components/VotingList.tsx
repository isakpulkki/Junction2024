// Voting.tsx
import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';

interface Item {
  title: string;
  description: string;
  link: string;
}

interface MyComponentProps {
  items: Item[];
}



const VotingList: React.FC<MyComponentProps> = ({ items }) => {
  return (
    <Container>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h3">Voting</Typography>
          <FormControl fullWidth>
            <Select defaultValue="All">
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Hot">Hot</MenuItem>
              <MenuItem value="Euro">Euro</MenuItem>
              <MenuItem value="Budget">Budget</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Container>
      <Grid container spacing={3} columns={{ md: 2 }}>
        {items.map((item) => (
          <Grid size={1}>
            <Button
              variant="contained"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh',
                margin: '8px',
                padding: '16px',
              }}
            >
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VotingList;
