import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { FaBed, FaRulerCombined, FaBuilding, FaThermometerHalf } from 'react-icons/fa';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StyledCard = styled(Card)({
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
  },
});

const CardMediaStyled = styled(CardMedia)({
  height: '381px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const CardHeader = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 100%)',
  color: 'white',
  padding: '10px',
  borderRadius: '16px 16px 0 0',
  textAlign: 'center',
  zIndex: 1,
});

const CardContentWrapper = styled(CardContent)({
  padding: '20px',
  background: '#f5f5f5',
  position: 'relative',
  zIndex: 2,
});

const PriceTag = styled(Typography)({
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#ff5722',
  marginBottom: '8px',
});

const FeatureItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',
  '&:last-child': {
    marginBottom: '0',
  },
});

const FeatureIcon = styled(Box)({
  minWidth: '28px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '8px',
  color: '#1976d2',
});

const ShareButton = styled(IconButton)({
  color: '#ffffff',
  backgroundColor: '#ff5722',
  borderRadius: '50%',
  position: 'absolute',
  top: '25px',
  left: '25px',
  opacity: 0.5,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    backgroundColor: '#e64a19',
    opacity: 1,
  },
});

const ApartmentCard = ({
  images,
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
    <motion.div whileHover={{ scale: 1.03 }}>
      <StyledCard>
        <Slider>
          {images.length > 0 ? (
            images.map((image, index) => (
              <CardMediaStyled
                key={index}
                component="img"
                image={image.url}
                alt={title}
              />
            ))
          ) : (
            <Typography variant="h6" align="center">
              Фотографій не знайдено
            </Typography>
          )}
        </Slider>
        <Tooltip title="Додати у вибрані" arrow>
          <ShareButton>
            <FavoriteIcon />
          </ShareButton>
        </Tooltip>
        <CardHeader>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <PriceTag>
            ${price}
          </PriceTag>
        </CardHeader>
        <CardContentWrapper>
          <Box>
            <Typography variant="inherit" color="black" fontWeight="bold" gutterBottom sx={{ fontSize: '1.3rem' }}>
              Характеристики Квартири
            </Typography>
            <FeatureItem>
              <FeatureIcon>
                <LocationOnIcon />
              </FeatureIcon>
              <Typography variant="inherit" color="black">
                {locality}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaBed />
              </FeatureIcon>
              <Typography variant="inherit" color="black">
                Кількість кімнат: {numberOfRooms}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaBuilding />
              </FeatureIcon>
              <Typography variant="inherit" color="black">
                Поверх: {floorInApartment}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaRulerCombined />
              </FeatureIcon>
              <Typography variant="inherit" color="black">
                Площа: {square} м²
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaBuilding />
              </FeatureIcon>
              <Typography variant="inherit" color="black">
                Матеріал стін: {wallMaterial}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <FaThermometerHalf />
              </FeatureIcon>
              <Typography variant="inherit" color="black">
                Опалення: {heating}
              </Typography>
            </FeatureItem>
          </Box>
          <Typography variant="inherit" fontWeight="bold" gutterBottom sx={{ marginTop: '3rem', fontSize: '20px' }}>
            ДЕТАЛІ
          </Typography>
          <Typography variant="inherit" color="black" paragraph sx={{ letterSpacing: '0.02rem', whiteSpace: 'pre-line' }}>
            {description}
          </Typography>
        </CardContentWrapper>
      </StyledCard>
    </motion.div>
  );
};

export default ApartmentCard;
