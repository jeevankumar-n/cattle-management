import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';  // Import axios for making HTTP requests
import './styles.css'; // Ensure the path to your styles is correct

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();  // Initialize navigate hook
  axios.defaults.withCredentials = true;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value  // Dynamically update form fields based on input
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send login data to the backend
    axios.post('http://localhost:3000/login', formData)
      .then(response => {
        console.log("Login successful:", response.data);
        navigate('/components/dashboard');  // Redirect after successful login
      })
      .catch(error => {
        console.error("Login failed:", error.response.data);
        alert('Invalid username or password');
      });
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a></li>
            <li><a href="/explore" onClick={(e) => { e.preventDefault(); navigate('/explore'); }}>Explore</a></li>
            <li><a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Sign Up</a></li>
            <li><a href="/login" className="active">Login</a></li>
          </ul>
        </nav>
      </header>

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="login-username">Username</label>
              <input
                type="text"
                id="login-username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-btn">Login</button>
            <div className="register-link">
              Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
