import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { IS_LOGGED_IN, LOGIN_MUTATION } from './apollo/auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginForm from './components/auth/LoginForm';  // Import the LoginForm component
import ApartmentDetails from './components/ApartmentDetails';
import AdminPanel from './components/AdminPanel';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [loginOrEmail, setLoginOrEmail] = useState('');  // Define loginOrEmail state
  const [password, setPassword] = useState('');          // Define password state

  const { data, loading } = useQuery(IS_LOGGED_IN, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    },
    skip: !token,
  });

  const [login] = useMutation(LOGIN_MUTATION);

  useEffect(() => {
    if (data && data.isLoggedIn !== undefined) {
      setIsLoggedIn(data.isLoggedIn);
    }
  }, [data]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        // Perform login only if loginOrEmail and password are not empty
        if (loginOrEmail && password) {
          const response = await login({
            variables: {
              loginOrEmail,
              password,
            },
          });

          const { accessToken, id } = response.data.login;

          localStorage.setItem('token', accessToken);
          localStorage.setItem('userId', id);

          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }
    };

    if (token) {
      checkTokenValidity();
    }
  }, [login, loginOrEmail, password, token]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm setLoginOrEmail={setLoginOrEmail} setPassword={setPassword} />} />
          <Route path="/apartment/:id" element={<ApartmentDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
