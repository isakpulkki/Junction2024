import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const authOptions = [
  {
    name: "Varmennekortti",
    logo: "https://via.placeholder.com/70?text=V",
    color: "#2C3E50",
  },
  {
    name: "Mobiilivarmenne",
    logo: "https://via.placeholder.com/70?text=M",
    color: "#4ECDC4",
  },
  {
    name: "Osuuspankki",
    logo: "https://via.placeholder.com/70?text=OP",
    color: "#FF6600",
  },
  {
    name: "Nordea",
    logo: "https://via.placeholder.com/70?text=N",
    color: "#005BAC",
  },
  {
    name: "Danske Bank",
    logo: "https://via.placeholder.com/70?text=DB",
    color: "#003A70",
  },
  {
    name: "Handelsbanken",
    logo: "https://via.placeholder.com/70?text=HB",
    color: "#1B3E7C",
  },
  {
    name: "Ålandsbanken",
    logo: "https://via.placeholder.com/70?text=ÅB",
    color: "#046A38",
  },
  {
    name: "S-Pankki",
    logo: "https://via.placeholder.com/70?text=SP",
    color: "#009639",
  },
  {
    name: "Aktia",
    logo: "https://via.placeholder.com/70?text=A",
    color: "#9E1B32",
  },
  {
    name: "POP Pankki",
    logo: "https://via.placeholder.com/70?text=POP",
    color: "#007A33",
  },
  {
    name: "Säästöpankki",
    logo: "https://via.placeholder.com/70?text=SP",
    color: "#2C5234",
  },
  {
    name: "Oma Säästöpankki",
    logo: "https://via.placeholder.com/70?text=Oma",
    color: "#003366",
  },
];

const Authentication: React.FC = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, borderRadius: 2, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Valitse tunnistustapa
      </Typography>
      <Grid container spacing={4}>
        {authOptions.map(({ name, logo, color }) => (
          <Grid item xs={6} sm={4} md={3} key={name} textAlign="center">
            <Box
              component="img"
              src={logo}
              alt={name}
              onClick={handleIconClick}
              sx={{
                borderRadius: 1,
                backgroundColor: color,
                p: 1,
                cursor: "pointer",
                transition: "all 0.3s ease", // Smooth transition for hover effects
                "&:hover": {
                  transform: "scale(1.1)", // Slightly enlarge the image on hover
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Add a shadow
                },
              }}
            />
            <Typography variant="body2">{name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Authentication;
