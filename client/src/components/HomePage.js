import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_APARTMENTS } from '../apollo/get-base';
import ProductCard from './ProductCard';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_APARTMENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Привіт, це Головна сторінка!</h1>
      <div className="row">
        {data.apartments.map((apartment) => (
          <ProductCard key={apartment.id} product={apartment} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;