import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook for navigation
import './styles.css';

const Explore = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a></li>
            <li><a href="/explore" className="active">Explore</a></li>
            <li><a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>Sign Up</a></li>
            <li><a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Sign In</a></li>
          </ul>
        </nav>
      </header>

      <section id="features" className="section">
        <h2>Features</h2>
        <section>
          <p>
            Our platform is designed to cater to buyers, farmers, and sellers alike. Buyers can explore a diverse selection of cattle, complete with detailed records on behavior, growth, and health, ensuring informed decisions. Farmers benefit from real-time insights into their herd's behavior and growth, streamlining monitoring and management for optimized productivity. Sellers can effectively showcase their cattle to a broad audience, with tools that highlight detailed performance data to attract potential buyers. Join us and transform your cattle management experience with unparalleled transparency and control.
          </p>
        </section>
      </section>

      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <p>If you have any questions or need support, please feel free to reach out:</p>
        <section>
          <ul>
            <li>Email: jeevankumarn.21@gmail.com</li>
            <li>Phone: +91 9902213259</li>
            <li>Address: Kolar district, Karnataka</li>
          </ul>
        </section>
      </section>

     
    </div>
  );
};

export default Explore;
