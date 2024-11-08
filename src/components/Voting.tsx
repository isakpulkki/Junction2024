// Voting.tsx
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Voting: React.FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h3" component="h1">
          Voting
        </Typography>
        <FormControl fullWidth>
          <Select defaultValue="Hot">
            <MenuItem value="Hot">Hot</MenuItem>
            <MenuItem value="Euro">Euro</MenuItem>
            <MenuItem value="Budget">Budget</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Voting;
