// src/components/HomePage.js
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_APARTMENTS } from '../apollo/get-base';
import ProductCard from './ProductCard';
import SortDropdown from './SortDropdown';
import styled from 'styled-components';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_APARTMENTS);
  const [apartments, setApartments] = useState([]);
  const [sortedApartments, setSortedApartments] = useState([]); // Додали стан для відсортованих квартир

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Перші відображення без сортування
  if (apartments.length === 0) {
    setApartments(data.apartments);
  }

  const handleSort = (order) => {
    let sortedList = [...apartments]; // Копіюємо невідсортований список
    if (order === 'asc') {
      sortedList.sort((a, b) => a.price - b.price); // сортування за зростанням ціни
    } else if (order === 'desc') {
      sortedList.sort((a, b) => b.price - a.price); // сортування за спаданням ціни
    }
    setSortedApartments(sortedList); // Оновлюємо відсортований список
  };

  return (
    <div className="container">
      <SortDropdown handleSort={handleSort} />
      <div className="row">
        {sortedApartments.length > 0 ? (
          sortedApartments.map((apartment) => (
            <ProductCard key={apartment.id} product={apartment} />
          ))
        ) : (
          apartments.map((apartment) => (
            <ProductCard key={apartment.id} product={apartment} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
