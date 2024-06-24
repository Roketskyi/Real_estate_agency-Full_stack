import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from '../../apollo/register';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';

const RegisterForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER_MUTATION);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await registerUser({
          variables: {
            loginInput: {
              login,
              password,
              email
            }
          }
        });
  
        console.log(response);
        setErrorMessage('');
  
      } catch (err) {
        console.error('Registration error:', err);
        setErrorMessage(err.message);
      }
    };
  
    return (
      <Container maxWidth="xs">
        <Paper elevation={6} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} sx={{ padding: 3, marginTop: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Реєстрація
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Логін"
              variant="outlined"
              fullWidth
              value={login}
              onChange={(e) => setLogin(e.target.value)}
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
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Зареєструватись
            </Button>
            {errorMessage && (
              <Typography variant="body2" color="error.main" align="center">
                {errorMessage}
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
    );
  };
  

export default RegisterForm;
