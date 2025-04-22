import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // For styling

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Default credentials
  const DEFAULT_USERNAME = "admin";
  const DEFAULT_PASSWORD = "admin123";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      onLogin(true);
      navigate("/students");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Student Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="button-group">
            <button type="submit" className="signin-btn">
              Sign In
            </button>
          </div>
          <div className="default-credentials">
            <p>Default Credentials:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
