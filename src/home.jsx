// home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import './styles.css'; // Ensure to import the CSS

const Home = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/explore">Explore</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div id="home" className="section">
        <h1>Welcome to Cattle Management Portal</h1>
      </div>


    </div>
  );
};

export default Home;
