import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LockIcon from '@mui/icons-material/Lock';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

function AuthenticationBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              letterSpacing: '.3rem',
            }}
          >
            Voice
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Button variant="contained" color="primary">
              <LockIcon sx={{ mr: 1 }} /> Authenticate
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AuthenticationBar;
