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
import ApartmentPrice from './ApartmentPrice';
import { styled } from '@mui/system';

const PageContainer = styled(Container)({
  backgroundColor: '#e8e8e8',
  padding: '42px',
  borderRadius: '20px',
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
  maxWidth: '1880px',
});

const ApartmentDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APARTMENT_BY_ID, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const { apartment } = data;

  return (
    <PageContainer>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ApartmentCard
              images={apartment.images}
              title={apartment.title}
              description={apartment.description}
              price={apartment.price}
              locality={data.apartment.locality}
              floorInApartment={apartment.floorInApartment}
              numberOfRooms={apartment.numberOfRooms}
              square={apartment.square}
              wallMaterial={apartment.wallMaterial}
              heating={apartment.heating}
            />
          </motion.div>
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
            <LocationMap locality={data.apartment.locality} />
          </motion.div>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }}>
            <ApartmentPrice price={apartment.price} />
          </motion.div>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ApartmentDetails;
