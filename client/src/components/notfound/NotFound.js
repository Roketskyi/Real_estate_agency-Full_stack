import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src="./notfound/notfound.png" alt="Not Found" className="not-found-image" />
      <div className="not-found-text">
        <h1>СТОРІНКА НЕ ЗНАЙДЕНА</h1>
        <h2>ПОМИЛКА 404</h2>
        <Link to="/" className="home-button">ГОЛОВНА СТОРІНКА</Link>
      </div>
    </div>
  );
};

export default NotFound;
