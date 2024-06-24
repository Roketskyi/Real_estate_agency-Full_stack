import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  marginTop: '20px',
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

const ContactForm = ({ sellerEmail }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Зв'яжіться з продавцем
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Ваше ім'я"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Ваш email"
              variant="outlined"
              margin="normal"
              type="email"
              required
            />
            <TextField
              fullWidth
              label="Повідомлення"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              Надіслати
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default ContactForm;
