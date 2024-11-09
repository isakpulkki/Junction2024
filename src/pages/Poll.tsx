import { useState, useEffect } from 'react';
import axios from 'axios';
import AuthenticationBar from '../components/AuthenticationBar';
import {
  ThemeProvider,
  Box,
  Typography,
  Container,
  Stack,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { theme } from '../App';
import { useLocation, useNavigate } from 'react-router-dom';

type VoteType = 'positive' | 'negative';

export default function Poll() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { poll } = state || {};

  const [votes, setVotes] = useState({ positive: poll?.positiveVotes || 0, negative: poll?.negativeVotes || 0 });
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);
  const [scrapedContent, setScrapedContent] = useState('');

  useEffect(() => {
    const fetchScrapedContent = async () => {
      if (!poll.link) return;
      try {
        const response = await axios.get(`http://localhost:5000/scrape?url=${poll.link}`);
        setScrapedContent(response.data.content);
        console.log(scrapedContent);
      } catch (error) {
        console.error('Error fetching scraped data:', error);
      }
    };

    fetchScrapedContent();
  }, [poll.link]);

  const handleVote = (type: VoteType) => {
    setVotes((prev) => {
      const updatedVotes = { ...prev, [type]: prev[type] + (selectedVote === type ? -1 : 1) };
      if (selectedVote && selectedVote !== type) updatedVotes[selectedVote] -= 1;
      setSelectedVote(selectedVote === type ? null : type);
      return updatedVotes;
    });
  };

  const DataItem = ({ label, value }: { label: string; value: string }) => (
    <Box display="flex" alignItems="center" gap={2} mb={1} justifyContent="space-between" width="100%">
      <Typography variant="body2" color="white" sx={{ minWidth: '100px', textAlign: 'left' }}>
        {label}
      </Typography>
      <Paper
        sx={{
          backgroundColor: theme.palette.grey[800],
          p: 0.7,
          borderRadius: 1,
          width: '30%',
          minWidth: '30px'
        }}
      >
        <Typography variant="body2" color="white">
          {value}
        </Typography>
      </Paper>
    </Box>
  );

  const handleGoBack = () => navigate(-1);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginBottom: '10px' }}>
        <AuthenticationBar />
      </div>
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
          <Typography variant="body1" gutterBottom>
            {poll.pubDate}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {poll.link}
          </Typography>
          
          
          {/* Dropdown Accordion */}
          <Box mt={3} width="100%">
            <Accordion sx={{backgroundColor: "#333333"}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" fontWeight="bold" color="white">
                  Read more
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* Summary */}
                <Typography variant="subtitle1" fontWeight="bold" color="white" mb={1}>
                  Summary:
                </Typography>
                <Typography variant="body1" paragraph sx={{ lineHeight: 1.7, color: 'white' }}>
                  Finland allocates a portion of its health budget to mental health services, ensuring
                  resources for prevention, treatment, and rehabilitation. Understanding this budget helps
                  citizens stay informed about the country's investment in mental health and the ongoing
                  efforts to support those in need.
                </Typography>
                
                {/* Key Points Section */}
                <Typography variant="subtitle1" fontWeight="bold" color="white" mt={2} mb={1}>
                  Key Points:
                </Typography>
                <Typography variant="body1" color="white" mb={1}>
                  La di da di da boo boo boo boo.
                </Typography>
                <Typography variant="body1" color="white" mb={1}>
                  La di da di da boo boo boo boo.
                </Typography>
                <Typography variant="body1" color="white" mb={1}>
                  La di da di da boo boo boo boo.
                </Typography>

                {/* Key Numbers Section */}
                <Typography variant="subtitle1" fontWeight="bold" color="white" mt={2} mb={1}>
                  Key Numbers:
                </Typography>
                <DataItem label="Total Mental Health Budget" value="€1.5 billion" />
                <DataItem label="Percentage of Health Budget" value="12%" />
                <DataItem label="Annual Increase" value="+5% in the last two years" />
              </AccordionDetails>
            </Accordion>
          </Box>

          {/* Voting buttons */}
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            {['positive', 'negative'].map((type) => (
              <Button
                key={type}
                onClick={() => handleVote(type as VoteType)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 1,
                  backgroundColor: selectedVote === type ? (type === 'positive' ? 'lightgreen' : 'lightcoral') : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedVote === type ? (type === 'positive' ? 'green' : 'red') : 'lightgray',
                  },
                }}
              >
                {type === 'positive' ? <ThumbUpIcon sx={{ color: 'green' }} /> : <ThumbDownIcon color="error" />}
                <Typography variant="body1" sx={{ marginLeft: '4px' }}>
                  {votes[type as VoteType]}
                </Typography>
              </Button>
            ))}
          </Stack>

          {/* Scrapettu data täs */}
          <Box mt={4} width="100%">
            <Typography variant="h6" gutterBottom>
              Scraped Content:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
              {scrapedContent}
            </Typography>
          </Box>

          <Button variant="outlined" sx={{ marginTop: 3 }} onClick={handleGoBack}>
            Go Back
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
