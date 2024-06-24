import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  marginTop: '20px',
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
});

const LocationMap = ({ location }) => {
  if (!location) {
    return (
      <StyledCard>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Місцезнаходження на мапі
          </Typography>
          <Typography variant="body1">Місцезнаходження не визначено</Typography>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Місцезнаходження на мапі
        </Typography>
        <div style={{ height: '300px', backgroundColor: '#f0f0f0' }}>
          {location.latitude && location.longitude ? (
            <Typography variant="body1">
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Typography>
          ) : (
            <Typography variant="body1">Координати місцезнаходження не визначено</Typography>
          )}
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default LocationMap;
