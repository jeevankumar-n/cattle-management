// MilkDetails.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './milk.css'; // Ensure the path is correct

const MilkDetails = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    cattleId: '',
    date: new Date().toISOString().slice(0, 10),
    snf: '',
    temperature: '',
    waterPercentage: '',
    fatPercentage: '',
    quantity: '',
    ratePerLiter: '',
    totalAmount: '',
  });

  const [showGetDataForm, setShowGetDataForm] = useState(false); // Toggle between forms
  const [cattleData, setCattleData] = useState([]); // Store fetched entries

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'quantity' || name === 'ratePerLiter') {
      const quantity = parseFloat(formData.quantity || 0);
      const rate = parseFloat(formData.ratePerLiter || 0);
      const totalAmount = (quantity * rate).toFixed(2);
      setFormData((prevData) => ({ ...prevData, totalAmount }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/milk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Milk details submitted successfully!');
        setFormData({
          name: '',
          cattleId: '',
          date: new Date().toISOString().slice(0, 10),
          snf: '',
          temperature: '',
          waterPercentage: '',
          fatPercentage: '',
          quantity: '',
          ratePerLiter: '',
          totalAmount: '',
        });
      } else {
        alert('Failed to submit milk details.');
      }
    } catch (error) {
      console.error('Error submitting milk details:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleFetchData = async (e) => {
    e.preventDefault();
    const { cattleId } = formData;

    try {
      const response = await fetch(`http://localhost:3000/milk/${cattleId}`);
      if (response.ok) {
        const data = await response.json();
        setCattleData(data); // Store fetched data
      } else {
        alert('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data. Please try again.');
    }
  };

  const toggleForm = () => {
    setShowGetDataForm(!showGetDataForm); // Toggle between forms
  };

  const handleLogout = () => {
    navigate('/components/dashboard');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-buttons">
          <button onClick={toggleForm}>
            {showGetDataForm ? 'Back' : 'Get Data'}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {!showGetDataForm ? (
        <div className="milk-details-container">
          <h2>Milk Details</h2>
          <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div className="form-field">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Cattle ID:</label>
              <input type="text" name="cattleId" value={formData.cattleId} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>SNF (%):</label>
              <input type="number" name="snf" value={formData.snf} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-field">
              <label>Temperature (°C):</label>
              <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-field">
              <label>Water Percentage (%):</label>
              <input type="number" name="waterPercentage" value={formData.waterPercentage} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-field">
              <label>Fat Percentage (%):</label>
              <input type="number" name="fatPercentage" value={formData.fatPercentage} onChange={handleChange} step="0.01" required />
            </div>
            <div className="form-field">
              <label>Quantity (Liters):</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Rate per Liter:</label>
              <input type="number" name="ratePerLiter" value={formData.ratePerLiter} onChange={handleChange} required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="milk-details-container">
          <h2>Milk Data</h2>
          <form onSubmit={handleFetchData} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="form-field">
              <label>Cattle ID:</label>
              <input type="text" name="cattleId" value={formData.cattleId} onChange={handleChange} required />
            </div>
            <button type="submit">Fetch Data</button>
          </form>

          {cattleData.length > 0 && (
            <table className="data-table" style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Quantity (L)</th>
                  <th>Rate (₹/L)</th>
                  <th>Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {cattleData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.date}</td>
                    <td>{entry.quantity}</td>
                    <td>{entry.ratePerLiter}</td>
                    <td>{entry.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default MilkDetails;
