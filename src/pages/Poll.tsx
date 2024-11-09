import { useState } from "react";
import AuthenticationBar from "../components/AuthenticationBar";
import {
  ThemeProvider,
  Box,
  Typography,
  Container,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { theme } from "../App";
import { useLocation, useNavigate } from "react-router-dom";

type VoteType = "positive" | "negative";

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

  const DataItem = ({ label, value }: { label: string; value: string }) => (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      mb={1}
      justifyContent="space-between"
      width="100%"
    >
      <Typography
        variant="body2"
        color="black"
        sx={{ minWidth: "100px", textAlign: "left" }}
      >
        {label}
      </Typography>
      <Paper
        sx={{
          backgroundColor: theme.palette.info.light,
          p: 0.7,
          borderRadius: 1,
          width: "30%",
          minWidth: "30px",
        }}
      >
        <Typography variant="body2" color="white">
          {value}
        </Typography>
      </Paper>
    </Box>
  );
  const [generatedResponse, setGeneratedResponse] = useState<string | null>(
    null
  );
  const handleGoBack = () => navigate(-1);
  const handleGenerate = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response error:", errorText); // Log response error
        throw new Error("Failed to fetch from the server");
      }

      const data = await response.json();
      setGeneratedResponse(data.response || "No response generated.");
    } catch (error) {
      console.error("Error in handleGenerate:", error); // Log detailed error
      setGeneratedResponse("An error occurred while generating the response.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginBottom: "10px" }}>
        <AuthenticationBar />
      </div>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            padding: 4,
            textAlign: "center",
            my: 2,
          }}
        >
          <Typography variant="h4" fontWeight="600" gutterBottom sx={{ mb: 3 }}>
            {poll.title}
          </Typography>
          <Paper
            sx={{ width: "100%", p: 1.5, boxShadow: 5, borderRadius: "8px" }}
          >
            <Typography variant="body1" fontWeight="500" gutterBottom>
              {poll.description}
            </Typography>
          </Paper>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleGenerate}
          >
            Generate
          </Button>
          {generatedResponse && (
            <Paper
              sx={{
                marginTop: 3,
                padding: 2,
                width: "100%",
                backgroundColor: theme.palette.background.default,
                boxShadow: 4,
              }}
            >
              <Typography variant="h6" color="black" fontWeight="bold">
                Generated Response:
              </Typography>
              <Typography variant="body1" color="black">
                {generatedResponse}
              </Typography>
            </Paper>
          )}
          {/* Information Section */}
          <Box mt={3} width="100%">
            {/* Summary */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="black"
              mb={1}
            >
              Summary:
            </Typography>

            <Typography
              textAlign="left"
              variant="body1"
              paragraph
              sx={{ lineHeight: 1.7, color: "black" }}
            >
              INSERT SUMMARY HERE
            </Typography>

            {/* Key Points Section */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="black"
              mt={2}
              mb={1}
            >
              Key Points:
            </Typography>
            <Paper sx={{ boxShadow: 7, p: 1.5, borderRadius: "8px" }}>
              <Typography variant="body1" color="black" fontWeight="500" mb={1}>
                Key point 1
              </Typography>
              <Typography variant="body1" color="black" fontWeight="500" mb={1}>
                Key point 2
              </Typography>
              <Typography variant="body1" color="black" fontWeight="500" mb={1}>
                Key point 3
              </Typography>
            </Paper>

            {/* Key Numbers Section */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="black"
              mt={2}
              mb={1}
            >
              Key Numbers:
            </Typography>
            <DataItem label="Key number 1" value="€1.5 billion" />
            <DataItem label="Key number 2" value="12%" />
            <DataItem label="Key number 3" value="+5% in the last two years" />
          </Box>

          {/* Voting buttons */}
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            {["positive", "negative"].map((type) => (
              <Button
                key={type}
                onClick={() => handleVote(type as VoteType)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 1,
                  backgroundColor:
                    selectedVote === type
                      ? type === "positive"
                        ? "lightgreen"
                        : "lightcoral"
                      : "transparent",
                  "&:hover": {
                    backgroundColor:
                      selectedVote === type
                        ? type === "positive"
                          ? "green"
                          : "red"
                        : "lightgray",
                  },
                }}
              >
                {type === "positive" ? (
                  <ThumbUpIcon sx={{ color: "black" }} />
                ) : (
                  <ThumbDownIcon sx={{ color: "black" }} />
                )}
                <Typography variant="body1" sx={{ marginLeft: "4px" }}>
                  {votes[type as VoteType]}
                </Typography>
              </Button>
            ))}
          </Stack>
          <Button
            variant="outlined"
            sx={{
              marginTop: 3,
              color: theme.palette.grey[900],
              borderColor: theme.palette.grey[900],
              backgroundColor: theme.palette.primary.light,
            }}
            onClick={handleGoBack}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
