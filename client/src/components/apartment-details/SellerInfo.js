import React from 'react';
import { Card, CardContent, Typography, Avatar, CardHeader } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  overflow: 'hidden',
});

const SellerCardHeader = styled(CardHeader)({
  backgroundColor: '#3f51b5',
  color: 'white',
});

const SellerInfo = ({ seller }) => {
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
          subheader={seller.email}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary">
            Email: {seller.email}
          </Typography>
        </CardContent>
      </StyledCard>
    </motion.div>
  );
};

export default SellerInfo;
