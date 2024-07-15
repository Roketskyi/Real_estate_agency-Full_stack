import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_APARTMENTS } from '../apollo/get-base';
import ProductCard from './ProductCard';
import SortDropdown from './SortDropdown';
import styled, { keyframes } from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
  background: url('/notfound/notfound.png') no-repeat center center/cover;
  min-height: 100vh;
  padding: 50px 30px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-in;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.85), rgba(255,255,255,0));
    z-index: 1;
  }
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.85);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  text-align: center;
  max-width: 800px;
  width: 100%;
  animation: ${fadeIn} 1.5s ease-in;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2e4053;
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #566573;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 30px;
  padding: 10px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 30px;
  margin-left: 10px;
`;

const SearchButton = styled.button`
  background: #2e4053;
  color: #ffffff;
  border: none;
  outline: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #1f2e3d;
  }
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  animation: ${slideIn} 2s ease-in;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  animation: ${fadeIn} 2.5s ease-in;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0px;
`;

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_APARTMENTS);
  const [apartments, setApartments] = useState([]);
  const [sortedApartments, setSortedApartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data) {
      setApartments(data.apartments);
      setSortedApartments(data.apartments);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSort = (order) => {
    let sortedList = [...apartments];
    if (order === 'asc') {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedList.sort((a, b) => b.price - a.price);
    }
    setSortedApartments(sortedList);
  };

  const handleSearch = () => {
    const filteredList = apartments.filter(apartment =>
      apartment.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedApartments(filteredList);
  };

  return (
    <Container>
      <Header>
        <Title>Знайдіть ідеальні апартаменти</Title>
        <Subtitle>Розкішні квартири для будь-якого бюджету</Subtitle>
        <SearchBar>
          <FaSearch color="#2e4053" />
          <SearchInput
            type="text"
            placeholder="Пошук за назвою..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>Пошук</SearchButton>
        </SearchBar>
        <SortDropdown handleSort={handleSort} />
      </Header>
      <Row>
        {sortedApartments.length > 0 ? (
          sortedApartments.map((apartment) => (
            <ProductCard key={apartment.id} product={apartment} />
          ))
        ) : (
          apartments.map((apartment) => (
            <ProductCard key={apartment.id} product={apartment} />
          ))
        )}
      </Row>
      <Footer>
        <FooterText>© 2024 Всі права захищені. Версаль.</FooterText>
      </Footer>
    </Container>
  );
};

export default HomePage;
