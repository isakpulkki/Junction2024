import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  Paper,
  LinearProgress,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useTheme } from '@mui/material/styles';

const SingleVoting = () => {
  const theme = useTheme();
  const [isFavorited, setIsFavorited] = useState(false);
  const [vote, setVote] = useState<'up' | 'down' | null>(null);

  const DataItem = ({ label, value }: { label: string; value: string }) => (
    <Box display="flex" alignItems="center" gap={3} mb={1}>
      <Typography variant="body2" color="white" sx={{ minWidth: '180px', textAlign: 'right' }}>
        {label}
      </Typography>
      <Paper
        sx={{
          backgroundColor: theme.palette.grey[800],
          p: 1,
          borderRadius: 1,
          width: '180px',
        }}
      >
        <Typography variant="body2" color="white">
          {value}
        </Typography>
      </Paper>
    </Box>
  );

  return (
    <Container 
      sx={{ 
        mt: 4, 
        mb: 8,
        px: { xs: 2, sm: 4 }, 
        color: theme.palette.text.primary,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box flex="1">
        {/* Header Section */}
        <Box
          sx={{
            pb: 1,
            borderBottom: `1px solid ${theme.palette.grey[700]}`,
            mb: 2,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="white">
            Mental Health Budget
          </Typography>
        </Box>

        {/* Date and Star Icon */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
          <Typography variant="caption" sx={{ color: '#FFD700' }}>
            8.11.2024
          </Typography>
          <IconButton
            onClick={() => setIsFavorited(!isFavorited)}
            sx={{
              backgroundColor: theme.palette.action.hover,
              borderRadius: '50%',
              p: 0.5,
              '&:hover': {
                backgroundColor: theme.palette.action.selected,
              },
            }}
          >
            {isFavorited ? (
              <StarIcon sx={{ color: '#FFD700', fontSize: '1.5rem' }} />
            ) : (
              <StarBorderIcon sx={{ color: theme.palette.text.secondary, fontSize: '1.5rem' }} />
            )}
          </IconButton>
        </Box>

        <Divider sx={{ my: 2, backgroundColor: theme.palette.grey[700] }} />

        {/* Description Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            backgroundColor: theme.palette.grey[900],
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'white' }}>
            Finland allocates a portion of its health budget to mental health services, ensuring
            resources for prevention, treatment, and rehabilitation. Understanding this budget helps
            citizens stay informed about the country's investment in mental health and the ongoing
            efforts to support those in need.
          </Typography>
        </Paper>

        {/* Key Numbers Section */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" color="white" mb={2}>
            Key Numbers:
          </Typography>
          <Box pl={2}>
            <DataItem 
              label="Total Mental Health Budget"
              value="€1.5 billion"
            />
            <DataItem 
              label="Percentage of Health Budget"
              value="12%"
            />
            <DataItem 
              label="Annual Increase"
              value="+5% in the last two years"
            />
          </Box>
        </Box>

        {/* Data Source Attribution */}
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" color="white">
            Data Source Attribution:
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 0.5, color: theme.palette.grey[500], fontStyle: 'italic' }}
          >
            Data provided by Finland's National Institute for Health and Welfare (THL) and Ministry of
            Social Affairs and Health.
          </Typography>
        </Box>

        {/* Voting Section */}
        <Box mt={4} mb={8} textAlign="center">
          <Typography variant="h6" fontWeight="bold" color="white" mb={2}>
            Vote on this Topic
          </Typography>
          
          {!vote && (
            <Box display="flex" justifyContent="center" gap={3}>
              <Button
                onClick={() => setVote('up')}
                startIcon={<ThumbUpIcon sx={{ color: '#4CAF50' }} />}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.grey[800],
                  color: theme.palette.text.secondary,
                  width: '180px',
                  height: '48px',
                  '&:hover': {
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                Thumbs Up
              </Button>
              <Button
                onClick={() => setVote('down')}
                startIcon={<ThumbDownIcon sx={{ color: '#F44336' }} />}
                variant="contained"
                sx={{
                  backgroundColor: theme.palette.grey[800],
                  color: theme.palette.text.secondary,
                  width: '180px',
                  height: '48px',
                  '&:hover': {
                    backgroundColor: '#F44336',
                    color: 'white',
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  },
                }}
              >
                Thumbs Down
              </Button>
            </Box>
          )}

          {vote && (
            <Box mt={3} mb={8}>
              <Typography variant="body1" fontWeight="bold" color="white" mb={2}>
                Results
              </Typography>
              <Box display="flex" justifyContent="center" gap={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="white" sx={{ minWidth: '100px', textAlign: 'right' }}>
                    70% Thumbs Up
                  </Typography>
                  <Paper
                    sx={{
                      width: '180px',
                      height: '40px',
                      backgroundColor: theme.palette.grey[800],
                      overflow: 'hidden',
                      borderRadius: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: '70%',
                        height: '100%',
                        backgroundColor: '#4CAF50',
                      }}
                    />
                  </Paper>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" color="white" sx={{ minWidth: '100px', textAlign: 'right' }}>
                    30% Thumbs Down
                  </Typography>
                  <Paper
                    sx={{
                      width: '180px',
                      height: '40px',
                      backgroundColor: theme.palette.grey[800],
                      overflow: 'hidden',
                      borderRadius: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: '30%',
                        height: '100%',
                        backgroundColor: '#F44336',
                      }}
                    />
                  </Paper>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleVoting;