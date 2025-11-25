import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { Home, ArrowBack } from '@mui/icons-material';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h4" sx={{ mb: 3 }}>
          Página Não Encontrada
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          A página <strong>{location.pathname}</strong> que você está procurando não existe.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            size="large"
          >
            Voltar
          </Button>
          
          <Button 
            variant="outlined" 
            startIcon={<Home />}
            onClick={() => navigate('/')}
            size="large"
          >
            Página Inicial
          </Button>
        </Box>
      </Box>
    </Container>
  );
}