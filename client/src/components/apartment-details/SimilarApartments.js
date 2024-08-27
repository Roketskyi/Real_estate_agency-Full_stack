import React from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_APARTMENTS, GET_AVATAR_BY_USER_ID } from '../../apollo/get-base';
import { Card, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const StyledCard = styled(Card)({
  marginTop: '20px',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#f5f5f5',
  position: 'relative',
});

const CardImage = styled('img')({
  width: '100%',
  height: 'auto',
});

const CardOverlay = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#436392',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const SellerInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const PriceTag = styled(Typography)({
  color: '#00FF08',
  fontWeight: 'bold',
  fontSize: '1.2em',
});

const SellerName = styled(Typography)({
  color: '#FFFFFF',
});

const getFullName = (seller) => {
  const { lastName, firstName, middleName } = seller;
  return [lastName, firstName, middleName].filter(Boolean).join(' ');
};

const SimilarApartments = () => {
  const { loading, error, data } = useQuery(GET_APARTMENTS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Схожі квартири
      </Typography>
      {data.apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </>
  );
};

const ApartmentCard = ({ apartment }) => {
  const [getAvatar, { data: avatarData }] = useLazyQuery(GET_AVATAR_BY_USER_ID, {
    variables: { id: apartment.seller.id },
  });

  React.useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  const fullName = getFullName(apartment.seller);
  const initials = fullName.charAt(0) || apartment.seller.login.charAt(0);

  return (
    <StyledCard>
      <CardImage src={apartment.images[0]?.url} alt={apartment.title} />
      <CardOverlay>
        <SellerInfo>
          <Avatar
            src={avatarData?.user?.avatar}
            alt={fullName || apartment.seller.login}
            sx={{ width: 40, height: 40, marginRight: '10px' }}
          >
            {initials}
          </Avatar>
          <Typography variant="inherit" color="white">Продавець:&nbsp;</Typography>
          <SellerName variant="inherit">{fullName || apartment.seller.login}</SellerName>
        </SellerInfo>
        <Button variant="outlined" color="inherit">
          Детальна інформація
        </Button>
        <PriceTag>{`ЦІНА: ${apartment.price} $`}</PriceTag>
      </CardOverlay>
    </StyledCard>
  );
};

export default SimilarApartments;
