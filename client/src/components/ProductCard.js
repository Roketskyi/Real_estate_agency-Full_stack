// src/components/ProductCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  return (
    <div className="col-lg-12 col-md-12 col-12 mb-4">
      <Card className="single-product">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-4 col-12">
            <div className="product-image">
              <Card.Img src={product.imageUrl} alt={product.title} />
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            <Card.Body>
              <Card.Title>
                <a href={`product-grids/${product.id}`}>{product.title}</a>
              </Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
