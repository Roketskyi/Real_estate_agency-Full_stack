import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { GET_AVATAR_BY_USER_ID } from '../../apollo/get-base';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 12) return phoneNumber;

  const countryCode = phoneNumber.slice(0, 2);
  const operatorCode = phoneNumber.slice(2, 5);
  const firstPart = phoneNumber.slice(5, 8);
  const secondPart = phoneNumber.slice(8, 10);
  const thirdPart = phoneNumber.slice(10, 12);

  return `+${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
};

const getFullName = (seller) => {
  const { lastName, firstName, middleName } = seller;
  return [lastName, firstName, middleName].filter(Boolean).join(' ');
};

const StyledCard = styled(Card)({
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(105, 112, 121, 0.68)',
  overflow: 'hidden',
  color: 'rgba(255, 255, 255)',
});

const SellerCardHeader = styled(CardHeader)({
  backgroundColor: '#436392',
  color: 'rgba(255, 255, 255, 0.75)',
  '& .MuiCardHeader-title': {
    fontSize: '1.2rem',
  },
});

const SellerInfo = ({ seller }) => {
  const [getAvatar, { data: avatarData }] = useLazyQuery(GET_AVATAR_BY_USER_ID, {
    variables: { id: seller.id },
  });

  useEffect(() => {
    getAvatar();
  }, [getAvatar]);

  const fullName = getFullName(seller);
  const initials = fullName.charAt(0) || seller.login.charAt(0);

  const phone1 = seller.phone1 !== "0" ? formatPhoneNumber(seller.phone1) : null;
  const phone2 = seller.phone2 !== "0" ? formatPhoneNumber(seller.phone2) : null;

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <StyledCard>
        <SellerCardHeader
          avatar={
            <Avatar
              src={avatarData?.user?.avatar}
              alt={fullName || seller.login}
              sx={{ bgcolor: '#ff5722' }}
              aria-label="seller"
            >
              {initials}
            </Avatar>
          }
          title={`Продавець: ${fullName || seller.login}`}
        />
        <CardContent>
          <Typography variant="body1">Контактні дані для зворотнього зв'язку</Typography>
          <Typography variant="body1">Email: {seller.email}</Typography>
          {phone1 && (
            <Typography variant="body1">
              Номер продавця: {phone1}
            </Typography>
          )}
          {phone2 && (
            <Typography variant="body1">Номер продавця: {phone2}</Typography>
          )}
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default SellerInfo;
