// AuthenticationPage.tsx
import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  IconButton,
  Divider,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AuthenticationPage: React.FC = () => {
  // Authentication options with representative colors
  const authOptions = [
    { name: 'Varmennekortti', logo: 'https://via.placeholder.com/70?text=V', color: '#2C3E50' },
    { name: 'Mobiilivarmenne', logo: 'https://via.placeholder.com/70?text=M', color: '#4ECDC4' },
    { name: 'Osuuspankki', logo: 'https://via.placeholder.com/70?text=OP', color: '#FF6600' },
    { name: 'Nordea', logo: 'https://via.placeholder.com/70?text=N', color: '#005BAC' },
    { name: 'Danske Bank', logo: 'https://via.placeholder.com/70?text=DB', color: '#003A70' },
    { name: 'Handelsbanken', logo: 'https://via.placeholder.com/70?text=HB', color: '#1B3E7C' },
    { name: 'Ålandsbanken', logo: 'https://via.placeholder.com/70?text=ÅB', color: '#046A38' },
    { name: 'S-Pankki', logo: 'https://via.placeholder.com/70?text=SP', color: '#009639' },
    { name: 'Aktia', logo: 'https://via.placeholder.com/70?text=A', color: '#9E1B32' },
    { name: 'POP Pankki', logo: 'https://via.placeholder.com/70?text=POP', color: '#007A33' },
    { name: 'Säästöpankki', logo: 'https://via.placeholder.com/70?text=SP', color: '#2C5234' },
    { name: 'Oma Säästöpankki', logo: 'https://via.placeholder.com/70?text=Oma', color: '#003366' },
    { name: 'Hightrust.id', logo: 'https://via.placeholder.com/70?text=H', color: '#2C3E50' },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
        Valitse tunnistustapa
      </Typography>

      {/* Authentication Options Grid */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4}>
          {authOptions.map((option) => (
            <Grid item xs={6} sm={4} md={3} key={option.name} textAlign="center">
              <Box
                component="img"
                src={option.logo}
                alt={option.name}
                sx={{
                  width: '70px',
                  height: '70px',
                  mb: 1,
                  borderRadius: 1,
                  objectFit: 'contain',
                  backgroundColor: option.color, // Representative color for each option
                  p: 1,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)', // Slight scale-up effect on hover
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', // Shadow effect on hover
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {option.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Additional Authentication Methods */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton sx={{ backgroundColor: 'grey.800', borderRadius: '50%' }}>
            <ArrowBackIcon sx={{ color: 'primary.main' }} />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            Ulkomaalaisen tunnistustavat
            <br />
            Yhteiseurooppalaiset tunnistustavat ja Finnish Authenticator -sovellus.
          </Typography>
        </Box>
      </Paper>

      {/* Back and Footer Section */}
      <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          sx={{ color: 'primary.main' }}
        >
          Palaa palveluun
        </Button>
        <Box textAlign="center" maxWidth="sm">
          <Typography variant="caption" color="white" sx={{ lineHeight: 1.5 }}>
            Suomi.fi-tunnistus on julkishallinnon asiointipalveluiden yhteinen tunnistuspalvelu.
            Tunnistautuminen on turvallista ja helppoa. Valitset itse, mitä tunnistustapaa haluat
            hyödyntää. Tunnistus käyttää välityspalvelua. Telia Tunnistuksen välityspalvelun
            tarjoaa Telia Finland Oyj. Tunnistautumisen yhteydessä palveluntarjoajalle välitetään
            henkilötunnus ja nimi.{' '}
            <Typography component="span" variant="caption" color="primary">
              Tietosuojaseloste
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthenticationPage;
