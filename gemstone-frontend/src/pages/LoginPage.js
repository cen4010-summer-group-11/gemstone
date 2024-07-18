import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Make sure to create this CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    navigate('/dashboard'); // Redirect to dashboard after login
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-placeholder">LOGO</div>
        <h2>Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/sign-up">New user? Sign up here</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

