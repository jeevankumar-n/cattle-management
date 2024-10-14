import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './milk.css'; // Ensure the path is correct

const HealthDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    cattleId: '',
    currentDate: '',
    temperature: '',
    milkFever: '',
    ketosis: '',
    mastitis: '',
    healthIssue: '',
  });

  const [cattleData, setCattleData] = useState([]);
  const [showFetchDataForm, setShowFetchDataForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Health details submitted successfully!');
        setFormData({
          name: '',
          cattleId: '',
          currentDate: '',
          temperature: '',
          milkFever: '',
          ketosis: '',
          mastitis: '',
          healthIssue: '',
        });
      } else {
        alert('Failed to submit health details.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred while submitting data.');
    }
  };

  const handleFetchData = async (e) => {
    e.preventDefault();
    const { cattleId } = formData;

    if (!cattleId) {
      alert('Please enter a valid Cattle ID.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/health/${cattleId}`);
      if (response.ok) {
        const data = await response.json();
        setCattleData(Array.isArray(data) ? data : [data]);
        alert('Cattle data fetched successfully!');
      } else {
        alert('Failed to fetch data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred while fetching data.');
    }
  };

  const toggleFetchDataForm = () => setShowFetchDataForm((prev) => !prev);

  const handleLogout = () => navigate('/components/dashboard');

  return (
    <div>
      <nav className="navbar">
        <div className="nav-buttons">
          <button onClick={toggleFetchDataForm} className="nav-button">
            {showFetchDataForm ? 'Back' : 'Get Data'}
          </button>
          <button onClick={handleLogout} className="nav-button">Logout</button>
        </div>
      </nav>

      <div className="health-details-container">
        {!showFetchDataForm ? (
          <>
            <h2>Health Details</h2>
            <form onSubmit={handleSubmit}>
              {[
                { label: 'Name', name: 'name', type: 'text', placeholder: "Enter Cattle's Name" },
                { label: 'Cattle ID', name: 'cattleId', type: 'text' },
                { label: 'Current Date', name: 'currentDate', type: 'date' },
                { label: 'Temperature (°C)', name: 'temperature', type: 'number', placeholder: 'Enter Temperature' },
                { label: 'Health Issue', name: 'healthIssue', type: 'text', placeholder: 'Describe Health Issue' },
              ].map(({ label, name, type, placeholder }) => (
                <div className="form-field" key={name}>
                  <label htmlFor={name}>{label}:</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    placeholder={placeholder}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}

              {['milkFever', 'ketosis', 'mastitis'].map((name) => (
                <div className="form-field" key={name}>
                  <label htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
                  <select id={name} name={name} value={formData[name]} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              ))}

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </>
        ) : (
          <>
            <h2>Fetch Cattle Data</h2>
            <form onSubmit={handleFetchData}>
              <div className="form-field">
                <label htmlFor="cattleId">Cattle ID:</label>
                <input
                  type="text"
                  id="cattleId"
                  name="cattleId"
                  value={formData.cattleId}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">Fetch Data</button>
            </form>

            {cattleData.length > 0 && (
              <table className="data-table" style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Temperature (°C)</th>
                    <th>Mastitis</th>
                    <th>Milk Fever</th>
                    <th>Ketosis</th>
                    <th>Health Issue</th>
                  </tr>
                </thead>
                <tbody>
                  {cattleData.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.currentDate}</td>
                      <td>{entry.temperature}</td>
                      <td>{entry.mastitis}</td>
                      <td>{entry.milkFever}</td>
                      <td>{entry.ketosis}</td>
                      <td>{entry.healthIssue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HealthDetails;
