import { useState, useEffect } from "react";
import AuthenticationBar from "../components/AuthenticationBar";
import {
  ThemeProvider,
  Box,
  Typography,
  Container,
  Stack,
  Button,
  Paper,
  Skeleton,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { theme } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";

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

  const [summary, setSummary] = useState<string | null>(null);
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [keyFigures, setKeyFigures] = useState<
    { label: string; value: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoBack = () => navigate(-1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Server response error:", errorText);
          throw new Error("Failed to fetch from the server");
        }

        const data = await response.json();
        setSummary(data.summary || "No summary found.");
        setKeyPoints(data.key_points || []);
        setKeyFigures(data.key_figures || []);
      } catch (error) {
        console.error("Error in fetchData:", error);
        setSummary("An error occurred while generating the response.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginBottom: "10px" }}>
        <AuthenticationBar />
        <Sidebar />
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between", // places items at the far ends with space in between
              mb: 3,
            }}
          >
            <Button
              onClick={handleGoBack}
              sx={{
                color: theme.palette.grey[900],
                backgroundColor: theme.palette.primary.light,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              <ArrowBackIosNewIcon />
            </Button>
            {/* Spacer to center-align the title */}
            <Typography variant="h4" fontWeight="600" sx={{ margin: "0 auto" }}>
              {poll.title}
            </Typography>
            {/* Empty Box to act as a spacer on the right */}
            <Box sx={{ width: "40px" }} />{" "}
            {/* Adjust width to match button width for symmetry */}
          </Box>

          <Typography variant="h6" fontWeight="500" gutterBottom>
            The government is proposing changes to several tax laws. These
            changes would update the Public Broadcasting Tax, adjust the Value
            Added Tax rules, and modify specific tax rules for the Åland
            Islands. The goal is to improve how these taxes are applied and make
            sure they are up-to-date.
          </Typography>

          {/* Information Section */}
          <Box mt={3} width="100%">
            {/* Summary Section with Skeleton */}
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
              {loading ? (
                <Skeleton variant="rounded" width="100%" height={40} />
              ) : (
                summary || "No summary generated yet."
              )}
            </Typography>

            {/* Key Points Section with Skeletons */}
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
              {loading
                ? [1, 2, 3].map((index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      width="100%"
                      height={20}
                      sx={{ mb: 1 }}
                    />
                  ))
                : keyPoints.length > 0
                ? keyPoints.map((point, index) => (
                    <Typography
                      key={index}
                      variant="body1"
                      color="black"
                      fontWeight="500"
                      mb={1}
                    >
                      {point}
                    </Typography>
                  ))
                : "No key points generated yet."}
            </Paper>

            {/* Key Numbers Section with Skeleton */}
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="black"
              mt={2}
              mb={1}
            >
              Key Numbers:
            </Typography>
            <Paper sx={{ boxShadow: 7, p: 1.5, borderRadius: "8px" }}>
              {loading
                ? [1, 2, 3].map((index) => (
                    <Skeleton
                      key={index}
                      variant="rounded"
                      width="100%"
                      height={20}
                      sx={{ mb: 1 }}
                    />
                  ))
                : keyFigures.map((figure, index) => (
                    <DataItem
                      key={index}
                      label={figure.label}
                      value={figure.value}
                    />
                  ))}
            </Paper>
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
        </Box>
        <Box
          sx={{
            py: 3, // Adds vertical padding (top and bottom)
          }}
        ></Box>
      </Container>
    </ThemeProvider>
  );
}
