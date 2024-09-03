import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const formatPrice = (price) => {
    return price.toLocaleString('uk-UA');
};

const StyledCard = styled(Card)({
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F5F5F5',
    padding: '10px',
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '120px',
    border: '1px solid #ccc',
});

const PriceText = styled(Typography)({
    color: '#00FF08',
    fontWeight: 'bold',
    fontSize: '2em',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
});

const ApartmentPrice = ({ price }) => {
    return (
        <motion.div whileHover={{ scale: 1.05 }}>
            <StyledCard>
            <CardContent>
                <PriceText>
                    Ціна: {formatPrice(price)}$
                </PriceText>
            </CardContent>
            </StyledCard>
        </motion.div>
    );
};

export default ApartmentPrice;
