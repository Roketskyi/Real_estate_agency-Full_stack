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

const GalleryImage = styled('img')({
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
  marginBottom: '10px',
});

const ApartmentGallery = ({ images }) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <motion.div whileHover={{ scale: 1.05 }}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Галерея квартири
            </Typography>
            <Typography variant="body2">Немає доступних зображень для відображення</Typography>
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
            Галерея квартири
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {images.map((image, index) => (
              <Box key={index} sx={{ width: 'calc(33.33% - 10px)', marginRight: '10px', marginBottom: '10px' }}>
                <GalleryImage src={image} alt={`Image ${index + 1}`} />
              </Box>
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default ApartmentGallery;
