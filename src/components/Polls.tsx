// Polls.tsx
import React from 'react';
import { Box, Typography, Container, Button, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface Poll {
  title: string;
  description: string;
  positiveVotes: number;
  negativeVotes: number;
}

interface MyComponentProps {
  polls: Poll[];
}

const Polls: React.FC<MyComponentProps> = ({ polls }) => {
  const navigate = useNavigate();

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
          <Typography variant="h3">Polls</Typography>
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
        {polls.map((poll) => (
          <Grid size={1} >
            <Button
              variant="contained"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '31vh',
                margin: '8px',
                padding: '16px',
                borderRadius: '6px',
                boxShadow: '12'
              }}
              onClick={() => navigate('/poll', { state: { poll } })}
            >
              <Typography sx={{my:1}} variant="h6" fontWeight='500'>{poll.title}</Typography>
              <Typography>{poll.description}</Typography>
              <Stack direction="row" spacing={2} alignItems="center" my={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThumbUpIcon sx={{ color: 'green' }} />
                  <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                    {poll.positiveVotes}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ThumbDownIcon color="error" />
                  <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                    {poll.negativeVotes}
                  </Typography>
                </Box>
              </Stack>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Polls;
