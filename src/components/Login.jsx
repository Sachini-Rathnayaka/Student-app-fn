import React, { useState } from 'react';
import './Login.css'; // For styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    // Add your login logic here (e.g., API call)
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot-password">
            <a href="/forgot-password">Forget Your Password?</a>
          </div>
          <div className="button-group">
            <button type="button" className="register-btn">
              Register
            </button>
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;