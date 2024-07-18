// src/pages/LoginPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
        <div>
          <a href="#">Forgot Password?</a> | <a href="#">New user? Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


