import React, { useEffect, useState } from 'react';
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

const LocationMap = ({ locality }) => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (locality) {
      setLoading(true);
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locality)}&limit=1`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lon) });
            setError('');
          } else {
            setError('Адресу не знайдено.');
            setCoordinates(null);
          }
        })
        .catch(() => {
          setError('Помилка при отриманні даних.');
          setCoordinates(null);
        })
        .finally(() => setLoading(false));
    }
  }, [locality]);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Місцезнаходження на мапі
        </Typography>
        {loading ? (
          <Typography>Завантаження карти...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : coordinates ? (
          <div style={mapContainerStyle}>
            <MapContainer 
              center={[coordinates.lat, coordinates.lng]} 
              zoom={16} 
              style={mapContainerStyle}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[coordinates.lat, coordinates.lng]} icon={customIcon}>
                <Popup>{locality}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <Typography>Немає даних для відображення.</Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default LocationMap;
