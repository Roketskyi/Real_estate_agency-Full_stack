import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FaRegEnvelope, FaUserAlt, FaBed, FaRulerCombined, FaBuilding, FaThermometerHalf, FaPhoneAlt } from 'react-icons/fa';

const formatPrice = (price) => {
  return price.toLocaleString('uk-UA');
};

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.length !== 12) return phoneNumber;

  const countryCode = phoneNumber.slice(0, 2);
  const operatorCode = phoneNumber.slice(2, 5);
  const firstPart = phoneNumber.slice(5, 8);
  const secondPart = phoneNumber.slice(8, 10);
  const thirdPart = phoneNumber.slice(10, 12);

  return `+${countryCode} (${operatorCode}) ${firstPart}-${secondPart}-${thirdPart}`;
};

const getFullName = (seller) => {
  const { lastName, firstName, middleName } = seller;
  return [lastName, firstName, middleName].filter(Boolean).join(' ');
};

const truncateDescription = (description, maxLength) => {
  if (!description) return '';
  return description.length > maxLength ? `${description.slice(0, maxLength)}...` : description;
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
  const firstImage = product.images.length > 0 ? product.images[0].url : '';

  const phone1 = product.seller.phone1 !== "0" ? formatPhoneNumber(product.seller.phone1) : null;
  const phone2 = product.seller.phone2 !== "0" ? formatPhoneNumber(product.seller.phone2) : null;

  return (
    <Col flex="100%">
      <Card>
        <Row>
          <Col flex="30%" className='row align-items-center'>
            <Link to={`/apartment/${product.id}`}>
              <Image src={firstImage} alt={product.title} />
            </Link>
          </Col>
          <Col flex="70%">
            <Body>
              <Title>
                <Link to={`/apartment/${product.id}`}>{product.title}</Link>
              </Title>
              <Description>
                <Link to={`/apartment/${product.id}`}>
                  {truncateDescription(product.description, 55)}
                </Link>
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
                    <FaUserAlt /> Продавець: {getFullName(product.seller)}
                  </Info>
                  <Info>
                    <FaRegEnvelope /> Email: {product.seller.email}
                  </Info>
                  {phone1 && (
                    <Info>
                      <FaPhoneAlt /> Номер продавця: {phone1}
                    </Info>
                  )}
                  {phone2 && (
                    <Info>
                      <FaPhoneAlt /> Номер продавця: {phone2}
                    </Info>
                  )}
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
