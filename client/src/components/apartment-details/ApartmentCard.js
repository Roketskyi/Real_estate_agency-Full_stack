import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  borderRadius: '20px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
  overflow: 'hidden',
});

const CardHeader = styled('div')({
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '15px',
  borderRadius: '20px 20px 0 0',
});

const ApartmentCard = ({
  imagePath,
  title,
  description,
  price,
  locality,
  floorInApartment,
  numberOfRooms,
  square,
  wallMaterial,
  heating,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <StyledCard>
        <CardHeader>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardHeader>
        <CardMedia
          component="img"
          height="300"
          image={imagePath}
          alt={title}
          style={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Box my={2}>
            <Typography variant="body1" color="text.secondary" paragraph>
              {description}
            </Typography>
            <Box mt={2}>
              <Typography variant="h6" color="primary">
                Характеристики апартаменту
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Ціна:</strong> {price} $
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Місто:</strong> {locality}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Поверх:</strong> {floorInApartment}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Кількість кімнат:</strong> {numberOfRooms}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Площа:</strong> {square} м²
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Матеріал стін:</strong> {wallMaterial}
              </Typography>
              <Typography variant="body2" color="text.primary">
                <strong>Опалення:</strong> {heating}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default ApartmentCard;
