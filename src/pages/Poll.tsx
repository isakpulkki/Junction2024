import { useState } from 'react';
import AuthenticationBar from '../components/AuthenticationBar';
import {
  ThemeProvider,
  Box,
  Typography,
  Container,
  Stack,
  Button,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { theme } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

type VoteType = 'positive' | 'negative';

export default function Poll() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { poll } = state || {};

  const [votes, setVotes] = useState<{ positive: number; negative: number }>({
    positive: poll?.positiveVotes || 0,
    negative: poll?.negativeVotes || 0,
  });
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);

  const handleVote = (type: VoteType) => {
    setVotes((prev) => {
      const updatedVotes = {
        ...prev,
        [type]: prev[type] + (selectedVote === type ? -1 : 1),
      };
      if (selectedVote && selectedVote !== type)
        updatedVotes[selectedVote] -= 1;
      setSelectedVote(selectedVote === type ? null : type);
      return updatedVotes;
    });
  };

  const handleGoBack = () => navigate(-1);

  return (
    <ThemeProvider theme={theme}>
      <AuthenticationBar />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            padding: 4,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            {poll.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {poll.description}
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            {['positive', 'negative'].map((type) => (
              <Button
                key={type}
                onClick={() => handleVote(type as VoteType)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 1,
                  backgroundColor:
                    selectedVote === type
                      ? type === 'positive'
                        ? 'lightgreen'
                        : 'lightcoral'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor:
                      selectedVote === type
                        ? type === 'positive'
                          ? 'green'
                          : 'red'
                        : 'lightgray',
                  },
                }}
              >
                {type === 'positive' ? (
                  <ThumbUpIcon sx={{ color: 'green' }} />
                ) : (
                  <ThumbDownIcon color="error" />
                )}
                <Typography variant="body1" sx={{ marginLeft: '4px' }}>
                  {votes[type as VoteType]}
                </Typography>
              </Button>
            ))}
          </Stack>
          <Button
            variant="outlined"
            sx={{ marginTop: 3 }}
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
