import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const StyledCard = styled(Card)({
  marginTop: '8px',
  borderRadius: '20px',
  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(105, 112, 121, 0.68)',
  color: 'rgba(255, 255, 255)',
});

const mapContainerStyle = {
  height: '300px',
  width: '100%',
};

const center = {
  lat: 48.946943,
  lng: 24.706315,
};

const LocationMap = ({ location }) => {
  const latitude = location?.latitude || center.lat;
  const longitude = location?.longitude || center.lng;

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Місцезнаходження на мапі
        </Typography>
        <div style={mapContainerStyle}>
          <MapContainer 
            center={[latitude, longitude]} 
            zoom={16} 
            style={mapContainerStyle}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup>Місцезнаходження квартири</Popup>
            </Marker>
          </MapContainer>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default LocationMap;
