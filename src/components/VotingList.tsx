import React from "react";
import { Box, Typography, Container, Button, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FilterListIcon from "@mui/icons-material/FilterList";

interface Poll {
  title: string;
  description: string;
  positiveVotes: number;
  negativeVotes: number;
  link: string;
  pubDate: string;
}

interface MyComponentProps {
  polls: Poll[];
}

const VotingList: React.FC<MyComponentProps> = ({ polls }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Box
          display="flex"
          gap={0}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h3">Parliament proposals</Typography>

          <FormControl>
            <Select
              sx={{
                border: "none",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              defaultValue="All"
              displayEmpty
              IconComponent={FilterListIcon}
              renderValue={() => ""} // Removes the label
            >
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
          <Grid size={1}>
            <Button
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

                margin: "8px",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "1",
              }}
              onClick={() => navigate("/poll", { state: { poll } })}
            >
              <Typography sx={{ my: 1 }} variant="h6" fontWeight="500">
                {poll.title}
              </Typography>
              <Typography>{poll.description}</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mt: 2,
                }}
              >
                <Typography variant="body2">{`${new Date(poll.pubDate)
                  .getDate()
                  .toString()
                  .padStart(2, "0")}.${(new Date(poll.pubDate).getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}.${new Date(
                  poll.pubDate
                ).getFullYear()}`}</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThumbUpIcon sx={{ color: "black" }} />
                    <Typography variant="body2" sx={{ marginLeft: "4px" }}>
                      {poll.positiveVotes}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ThumbDownIcon sx={{ color: "black" }} />
                    <Typography variant="body2" sx={{ marginLeft: "4px" }}>
                      {poll.negativeVotes}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VotingList;
