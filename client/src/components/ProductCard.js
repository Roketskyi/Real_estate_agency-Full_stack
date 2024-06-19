import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FaRegEnvelope, FaUserAlt, FaBed, FaRulerCombined, FaBuilding, FaThermometerHalf } from 'react-icons/fa';

const formatPrice = (price) => {
  return price.toLocaleString('uk-UA'); // Використовуйте 'uk-UA' для української мови
};

const Card = styled.div`
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 30px; /* Adjust the margin value as per your design */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;


const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Col = styled.div`
  flex: ${(props) => props.flex || '1'};
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  transition: transform 0.3s;
  ${Card}:hover & {
    transform: scale(1.05);
  }
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
`;

const Body = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
  a {
    color: inherit;
  }
`;

const Details = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const InfoBlock = styled.div`
  flex: 1 1 45%;
  border-right: 1px solid #dadadb;
  padding-right: 20px;
`;

const Info = styled.p`
  font-size: 1rem;
  color: #444;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #28a745;
`;

const Locality = styled.p`
  font-size: 1.1rem;
  color: #007bff;
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

const ProductCard = ({ product }) => {
  const imagePath = `${product.imageUrl}`;

  return (
    <Col flex="100%">
      <Card>
        <Row>
          <Col flex="30%">
            {/* Wrap the Image with Link */}
            <Link to={`/apartment/${product.id}`}>
              <Image src={imagePath} alt={product.title} />
            </Link>
          </Col>
          <Col flex="70%">
            <Body>
              <Title>
                {/* Wrap the Title with Link */}
                <Link to={`/apartment/${product.id}`}>{product.title}</Link>
              </Title>
              <Description>
                {/* Wrap the Description with Link */}
                <Link to={`/apartment/${product.id}`}>{product.description}</Link>
              </Description>
              <Details>
                <InfoBlock>
                  <Price>Ціна: {formatPrice(product.price)} $</Price>
                  <Locality>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'yellow' }} />
                    Місто: {product.locality}
                  </Locality>
                </InfoBlock>
                <InfoBlock>
                  <Info>
                    <FaUserAlt /> Продавець: {product.seller.login}
                  </Info>
                  <Info>
                    <FaRegEnvelope /> Email: {product.seller.email}
                  </Info>
                </InfoBlock>
                <InfoBlock>
                  <Info>
                    <FaBuilding /> Поверх: {product.floorInApartment}
                  </Info>
                  <Info>
                    <FaBed /> Кількість кімнат: {product.numberOfRooms}
                  </Info>
                </InfoBlock>
                <InfoBlock>
                  <Info>
                    <FaRulerCombined /> Площа: {product.square} м²
                  </Info>
                  <Info>
                    <FaBuilding /> Матеріал стін: {product.wallMaterial}
                  </Info>
                  <Info>
                    <FaThermometerHalf /> Опалення: {product.heating}
                  </Info>
                </InfoBlock>
              </Details>
            </Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};

export default ProductCard;
