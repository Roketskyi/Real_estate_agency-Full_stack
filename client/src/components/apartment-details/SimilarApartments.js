import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  marginTop: '20px',
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

const SimilarApartments = () => {
  const similarApartments = [
    { id: 1, title: 'Схожа квартира 1', price: 120000 },
    { id: 2, title: 'Схожа квартира 2', price: 135000 },
    { id: 3, title: 'Схожа квартира 3', price: 110000 },
  ];

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Схожі квартири
          </Typography>
          {similarApartments.map((apartment) => (
            <div key={apartment.id} style={{ marginBottom: '10px' }}>
              <Typography variant="subtitle1">{apartment.title}</Typography>
              <Typography variant="body1">Ціна: {apartment.price} $</Typography>
            </div>
          ))}
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default SimilarApartments;
