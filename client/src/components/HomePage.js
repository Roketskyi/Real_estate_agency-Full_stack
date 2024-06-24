import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_APARTMENTS } from '../apollo/get-base';
import ProductCard from './ProductCard';
import SortDropdown from './SortDropdown';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_APARTMENTS);
  const [apartments, setApartments] = useState([]);
  const [sortedApartments, setSortedApartments] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (apartments.length === 0) {
    setApartments(data.apartments);
  }

  const handleSort = (order) => {
    let sortedList = [...apartments];
    if (order === 'asc') {
      sortedList.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedList.sort((a, b) => b.price - a.price);
    }
    setSortedApartments(sortedList);
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
