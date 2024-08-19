import React from 'react';
import { Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 12) return phoneNumber;

  const countryCode = phoneNumber.slice(0, 2);
  const operatorCode = phoneNumber.slice(2, 5);
  const firstPart = phoneNumber.slice(5, 8);
  const secondPart = phoneNumber.slice(8, 10);
  const thirdPart = phoneNumber.slice(10, 12);

  return `+${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
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
  const phone1 = seller.phone1 !== "0" ? formatPhoneNumber(seller.phone1) : null;
  const phone2 = seller.phone2 !== "0" ? formatPhoneNumber(seller.phone2) : null;

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <StyledCard>
        <SellerCardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#ff5722' }} aria-label="seller">
              {seller.login.charAt(0)}
            </Avatar>
          }
          title={`Продавець: ${seller.login}`}
        />
        <CardContent>
          <Typography variant="body1">
            <div>Email: {seller.email}</div>
            {phone1 && (
              <div>Номер продавця: {phone1}</div>
            )}
            {phone2 && (
              <div>Номер продавця: {phone2}</div>
            )}
          </Typography>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default SellerInfo;
