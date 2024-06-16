import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from './apollo/auth';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginForm from './components/auth/LoginForm';

const App = () => {
  const token = localStorage.getItem('token');
  const { data, loading } = useQuery(IS_LOGGED_IN, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    skip: !token,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (data && data.isLoggedIn !== undefined) {
      setIsLoggedIn(data.isLoggedIn);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
