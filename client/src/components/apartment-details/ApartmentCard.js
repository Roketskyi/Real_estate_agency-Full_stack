import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton, Tooltip, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

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
  height: '250px',
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

const ActionButton = styled(IconButton)({
  color: '#ffffff',
  backgroundColor: '#ff5722',
  borderRadius: '50%',
  position: 'absolute',
  bottom: '10px',
  right: '60px',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
});

const ShareButton = styled(IconButton)({
  color: '#ffffff',
  backgroundColor: '#ff5722',
  borderRadius: '50%',
  position: 'absolute',
  top: '10px',
  right: '10px',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
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
    <motion.div whileHover={{ scale: 1.03 }}>
      <StyledCard>
        <CardMediaStyled
          component="img"
          image={imagePath}
          alt={title}
        />
        <CardHeader>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <PriceTag>
            ${price}
          </PriceTag>
        </CardHeader>
        <CardContentWrapper>
          <Typography variant="body2" color="text.secondary" paragraph>
            {description}
          </Typography>
          <Box>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Характеристики апартаменту
            </Typography>
            <FeatureItem>
              <FeatureIcon>
                <LocationOnIcon />
              </FeatureIcon>
              <Typography variant="body2" color="text.primary">
                {locality}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <AccessTimeIcon />
              </FeatureIcon>
              <Typography variant="body2" color="text.primary">
                Поверх: {floorInApartment}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <HomeIcon />
              </FeatureIcon>
              <Typography variant="body2" color="text.primary">
                Кількість кімнат: {numberOfRooms}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <SquareFootIcon />
              </FeatureIcon>
              <Typography variant="body2" color="text.primary">
                Площа: {square} м²
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <LocalFireDepartmentIcon />
              </FeatureIcon>
              <Typography variant="body2" color="text.primary">
                Матеріал стін: {wallMaterial}
              </Typography>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <LocalFireDepartmentIcon />
              </FeatureIcon>
              <Typography variant="body2" color="text.primary">
                Опалення: {heating}
              </Typography>
            </FeatureItem>
          </Box>
        </CardContentWrapper>
        <Tooltip title="Add to Favorites" arrow>
          <ActionButton>
            <FavoriteIcon />
          </ActionButton>
        </Tooltip>
      </StyledCard>
    </motion.div>
  );
};

export default ApartmentCard;
