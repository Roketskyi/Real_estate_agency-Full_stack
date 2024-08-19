import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_APARTMENT_BY_ID } from '../../apollo/get-base';
import { Container, Grid, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ApartmentCard from './ApartmentCard';
import SellerInfo from './SellerInfo';
import Amenities from './Amenities';
import LocationMap from './LocationMap';
import SimilarApartments from './SimilarApartments';
import Carousel from './Carousel';
import { styled } from '@mui/system';

const images = [
  'https://polyakova.biz/content/portfolio/314/previewlist-314.jpg',
  'https://st2.depositphotos.com/3667099/5985/i/450/depositphotos_59857451-stock-photo-living-and-dining-room-interior.jpg',
  'https://img.freepik.com/free-photo/3d-rendering-loft-luxury-living-room-with-bookshelf_105762-2104.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLAK71iWjIXTdTjqfimP1IJD4Y4kQsEVAE0Q&s',
];

const PageContainer = styled(Container)({
  marginTop: '20px',
  backgroundColor: '#f0f2f5',
  padding: '20px',
  borderRadius: '20px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  maxWidth: '1200px',
});

const ApartmentDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APARTMENT_BY_ID, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const { apartment } = data;
  const imagePath = `${apartment.imageUrl}`;

  return (
    <PageContainer>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ApartmentCard
              imagePath={imagePath}
              title={apartment.title}
              description={apartment.description}
              price={apartment.price}
              locality={apartment.locality}
              floorInApartment={apartment.floorInApartment}
              numberOfRooms={apartment.numberOfRooms}
              square={apartment.square}
              wallMaterial={apartment.wallMaterial}
              heating={apartment.heating}
            />
          </motion.div>
          <Carousel images={images} />
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
            <Amenities amenities={apartment.amenities} />
          </motion.div>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
            <SimilarApartments />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={4}>
          <motion.div initial={{ x: 100 }} animate={{ x: 0 }}>
            <SellerInfo seller={apartment.seller} />
          </motion.div>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
            <LocationMap location={apartment.location} />
          </motion.div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ApartmentDetails;
