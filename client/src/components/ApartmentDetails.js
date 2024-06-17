import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_APARTMENT_BY_ID } from '../apollo/get-base';
import { Card } from 'react-bootstrap';

const ApartmentDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_APARTMENT_BY_ID, {
    variables: { id: parseInt(id, 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { apartment } = data;
  const imagePath = `${process.env.PUBLIC_URL}/apartments/${apartment.id}/${apartment.imageUrl}`;

  return (
    <div className="container">
      <Card className="single-product">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-4 col-12">
            <div className="product-image">
              <Card.Img src={imagePath} alt={apartment.title} className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            <Card.Body>
              <Card.Title>{apartment.title}</Card.Title>
              <Card.Text>{apartment.description}</Card.Text>
              <div>
                <p>Ціна: {apartment.price} $</p>
                <p>Продавець: {apartment.seller.login}</p>
                <p>Email: {apartment.seller.email}</p>
                <p>Місто: {apartment.locality}</p>
                <p>Поверх: {apartment.floorInApartment}</p>
                <p>Кількість кімнат: {apartment.numberOfRooms}</p>
                <p>Площа: {apartment.square} м²</p>
                <p>Матеріал стін: {apartment.wallMaterial}</p>
                <p>Опалення: {apartment.heating}</p>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApartmentDetails;
