// src/components/ProductCard.js
import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ product }) => {
  // Формування шляху до фотографії квартири
  const imagePath = `${process.env.PUBLIC_URL}/apartments/${product.id}/${product.imageUrl}`;

  return (
    <div className="col-lg-12 col-md-12 col-12 mb-4">
      <Card className="single-product">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-4 col-12">
            <div className="product-image">
              {/* Додаємо клас img-fluid для адаптивного розміру фотографії */}
              <Card.Img src={imagePath} alt={product.title} className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-12">
            <Card.Body>
              <Card.Title>
                <a href={`product-grids/${product.id}`}>{product.title}</a>
              </Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <div>
                <p>Ціна: {product.price} $</p>
                <p>Продавець: {product.seller.id}</p>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
