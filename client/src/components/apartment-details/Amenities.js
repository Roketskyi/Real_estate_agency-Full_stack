import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  marginTop: '20px',
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

const AmenityItem = styled(Typography)({
  padding: '10px',
  borderBottom: '1px solid #f0f0f0',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const Amenities = ({ amenities }) => {
  if (!amenities || !Array.isArray(amenities) || amenities.length === 0) {
    return (
      <motion.div whileHover={{ scale: 1.05 }}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Зручності
            </Typography>
            <Typography variant="body2">Немає доступних зручностей</Typography>
          </CardContent>
        </StyledCard>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Зручності
          </Typography>
          <Box>
            {amenities.map((amenity, index) => (
              <AmenityItem key={index} variant="body2">
                {amenity}
              </AmenityItem>
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default Amenities;
