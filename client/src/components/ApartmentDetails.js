import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_APARTMENT_BY_ID } from '../apollo/get-base';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaBed, FaRulerCombined, FaThermometerHalf, FaBuilding } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const ProductImage = styled.div`
  img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DetailsContainer = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Price = styled.p`
  font-size: 1.4em;
  font-weight: bold;
  color: #2ecc71;
`;

const SellerInfo = styled.div`
  margin-top: 20px;
`;

const SellerName = styled.p`
  font-weight: bold;
`;

const EmailLink = styled.a`
  color: #3498db;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const DetailItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
    color: #555;
  }
`;

const ApartmentDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APARTMENT_BY_ID, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { apartment } = data;
  const imagePath = `${apartment.imageUrl}`;

  return (
    <Container>
      <Card>
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-4 col-12">
            <ProductImage>
              <Card.Img src={imagePath} alt={apartment.title} />
            </ProductImage>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            <DetailsContainer>
              <Title>{apartment.title}</Title>
              <Description>{apartment.description}</Description>
              <Price>Ціна: {apartment.price} $</Price>
              <SellerInfo>
                <SellerName>Продавець: {apartment.seller.login}</SellerName>
                <p>Email: <EmailLink href={`mailto:${apartment.seller.email}`}>{apartment.seller.email}</EmailLink></p>
              </SellerInfo>
              <DetailItem><FaMapMarkerAlt /> Місто: {apartment.locality}</DetailItem>
              <DetailItem><FaBuilding /> Поверх: {apartment.floorInApartment}</DetailItem>
              <DetailItem><FaBed /> Кількість кімнат: {apartment.numberOfRooms}</DetailItem>
              <DetailItem><FaRulerCombined /> Площа: {apartment.square} м²</DetailItem>
              <DetailItem><FaBuilding /> Матеріал стін: {apartment.wallMaterial}</DetailItem>
              <DetailItem><FaThermometerHalf /> Опалення: {apartment.heating}</DetailItem>
            </DetailsContainer>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default ApartmentDetails;
