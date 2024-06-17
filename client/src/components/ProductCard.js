// src/components/ProductCard.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./css/ProductCard.css";

const ProductCard = ({ product }) => {
  const imagePath = `${process.env.PUBLIC_URL}/apartments/${product.id}/${product.imageUrl}`;

  return (
    <div className="col-lg-12 col-md-12 col-12 mb-4">
      <Card className="single-product">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-4 col-12">
            <div className="product-image">
              <Card.Img src={imagePath} alt={product.title} className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            <Card.Body>
              <Card.Title>
                <Link to={`/apartment/${product.id}`}>{product.title}</Link>
              </Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <div className="apartment-details">
                <p className="apartment-info">Ціна: {product.price} $</p>
                <p className="apartment-info">Продавець: {product.seller.login}</p>
                <p className="apartment-info">Email: {product.seller.email}</p>
                <p className="apartment-info">
                  <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'yellow' }} /> {/* Значок геолокації */}
                  Місто: {product.locality}
                </p>
                <p className="apartment-info">Поверх: {product.floorInApartment}</p>
                <p className="apartment-info">Кількість кімнат: {product.numberOfRooms}</p>
                <p className="apartment-info">Площа: {product.square} м²</p>
                <p className="apartment-info">Матеріал стін: {product.wallMaterial}</p>
                <p className="apartment-info">Опалення: {product.heating}</p>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
