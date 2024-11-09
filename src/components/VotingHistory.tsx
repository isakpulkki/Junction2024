// VotingHistory.tsx
import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Select,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useTheme } from '@mui/material/styles';

const votingHistoryData = [
  { pollName: 'Adopting a Digital Euro', choice: 'Yes', date: '2023-09-15' },
  { pollName: 'Increased Education Funding', choice: 'No', date: '2023-10-01' },
  { pollName: 'Funding Renewable Energy Sources', choice: 'Yes', date: '2023-10-20' },
  { pollName: 'Affordable Childcare Services', choice: 'Yes', date: '2023-11-03' },
  { pollName: 'Cybersecurity Enhancements', choice: 'No', date: '2023-11-05' },
];

const VotingHistory: React.FC = () => {
  const theme = useTheme();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Voting History
      </Typography>

      <Box sx={{ mt: 2 }}>
        <List>
          {votingHistoryData.map((vote, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  borderRadius: 1,
                  paddingY: 1.5,
                  paddingX: 2,
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fafafa',
                  mb: 1.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5 }}>
                  {vote.choice === 'Yes' ? (
                    <ThumbUpIcon sx={{ fontSize: 24, color: theme.palette.success.main }} />
                  ) : (
                    <ThumbDownIcon sx={{ fontSize: 24, color: theme.palette.error.main }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" color="textPrimary">
                      {vote.pollName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="textSecondary">
                      Voted: {vote.choice} on {vote.date}
                    </Typography>
                  }
                />
              </ListItem>
              {index < votingHistoryData.length - 1 && (
                <Divider sx={{ backgroundColor: theme.palette.grey[700], marginY: 0.5 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default VotingHistory;
