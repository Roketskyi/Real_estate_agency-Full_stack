import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../apollo/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loginOrEmail, setLoginOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ variables: { loginOrEmail, password } });

      if (response.data.login) {
        const { accessToken, id } = response.data.login;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('userId', id);

        navigate('/');
        window.location.reload();
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Форма авторизації</h3>
      <div>
        <label>Логін або Email:</label>
        <input
          type="text"
          value={loginOrEmail}
          onChange={(e) => setLoginOrEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>Вхід</button>
      {data && <p>Ласкаво просимо!</p>}
      {error && <p>Дані введено невірно</p>}
    </form>
  );
};

export default LoginForm;
