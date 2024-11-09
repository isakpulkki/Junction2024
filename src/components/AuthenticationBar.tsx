import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';

function AuthenticationBar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') setIsAuthenticated(true);
  }, []);

  const handleAuthenticateClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');
      navigate('/authentication');
    } else {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h5"
            noWrap
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Voice
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAuthenticateClick}
            >
              {isAuthenticated ? (
                <LockIcon sx={{ mr: 1 }} />
              ) : (
                <LockOpenIcon sx={{ mr: 1 }} />
              )}
              {isAuthenticated ? 'Authenticate' : 'Log out'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AuthenticationBar;
