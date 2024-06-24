import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../apollo/auth';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const [loginOrEmail, setLoginOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();
  const authContext = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginMutation({ variables: { loginOrEmail, password } });

      if (response.data.login) {
        const { accessToken } = response.data.login;
        authContext.login(accessToken);
        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (!authContext || !authContext.login) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} sx={{ padding: 3, marginTop: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Форма авторизації
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Логін або Email"
            variant="outlined"
            fullWidth
            value={loginOrEmail}
            onChange={(e) => setLoginOrEmail(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            variant="outlined"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Вхід
          </Button>
          {data && (
            <Typography variant="body2" color="success.main" align="center">
              Ласкаво просимо!
            </Typography>
          )}
          {error && (
            <Typography variant="body2" color="error.main" align="center">
              Дані введено невірно
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
