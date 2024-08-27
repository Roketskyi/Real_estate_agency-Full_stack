import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from '../../apollo/register';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';

const RegisterForm = ({ onSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registerUser, { loading }] = useMutation(REGISTER_USER_MUTATION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        variables: {
          loginInput: {
            login,
            password,
            email,
            firstName,
            lastName,
            middleName
          }
        }
      });

      setSuccessMessage('Успіх!');
      setErrorMessage('');

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      setErrorMessage(err.message);
      setSuccessMessage('');
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
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
            label="Ім'я"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Прізвище"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="По батькові"
            variant="outlined"
            fullWidth
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
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
          {successMessage && (
            <Typography variant="body2" color="success.main" align="center">
              {successMessage}
            </Typography>
          )}
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
