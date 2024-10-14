import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './milk.css'; // Reusing consistent styling

const MaternityDetails = () => {
  const navigate = useNavigate();
  
  const [maternityData, setMaternityData] = useState({
    cowId: '',
    calfId: '',
    calfGender: '',
    lactationNo: '',
    calvingDate: '',
    calvingDifficultyScore: '',
    bcsAtCalving: '',
    diagnosis: '',
    observations: '',
  });

  const [showGetDataForm, setShowGetDataForm] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaternityData({ ...maternityData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(maternityData);
  
    try {
      const response = await fetch('http://localhost:3000/maternity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maternityData),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get the error message from the response
        console.error('Server error:', errorText); // Log the error for debugging
        alert('Failed to submit data: ' + errorText);
        return;
      }
  
      const result = await response.json();
      console.log('Submission result:', result);
      alert('Maternity details submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleFetchData = async (e) => {
    e.preventDefault();
    const { cowId } = maternityData;
  
    console.log('Fetching data for Cow ID:', cowId); // Log cowId being fetched
    
    try {
      const response = await fetch(`http://localhost:3000/maternity/${cowId}`);
      console.log('Response status:', response.status); // Log response status
      if (response.ok) {
        const data = await response.json();
        setFetchedData(data);
        console.log('Fetched Data:', data); // Log the fetched data
      } else {
        alert('Failed to fetch data: ' + response.statusText); // Detailed error message
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setShowGetDataForm(!showGetDataForm);
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
        <div className="maternity-details-container">
          <h2>Maternity Details</h2>
          <form className="form-container" onSubmit={handleSubmit}>
            {['cowId', 'calfId', 'lactationNo'].map((field) => (
              <div className="form-field" key={field}>
                <label>{field.replace(/([A-Z])/g, ' $1')}:</label>
                <input
                  type="text"
                  name={field}
                  placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1')}`}
                  value={maternityData[field]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="form-field">
              <label>Calf Gender:</label>
              <select name="calfGender" onChange={handleChange} value={maternityData.calfGender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-field">
              <label>Calving Date:</label>
              <input type="date" name="calvingDate" value={maternityData.calvingDate} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Calving Difficulty Score:</label>
              <select name="calvingDifficultyScore" onChange={handleChange} value={maternityData.calvingDifficultyScore}>
                <option value="">Select</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} = {['No assistance', 'One person', 'Two people', 'Mechanical traction', 'Surgery'][i]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>BCS at Calving:</label>
              <select name="bcsAtCalving" onChange={handleChange} value={maternityData.bcsAtCalving}>
                <option value="">Select</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} = {['Emaciated', 'Thin', 'Average', 'Heavy', 'Fat'][i]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Diagnosis & Treatment:</label>
              <textarea name="diagnosis" value={maternityData.diagnosis} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Observations:</label>
              <textarea name="observations" value={maternityData.observations} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div className="maternity-details-container">
          <h2>Fetched Maternity Data</h2>
          <form onSubmit={handleFetchData} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div className="form-field">
              <label>Cow ID:</label>
              <input
                type="text"
                name="cowId"
                value={maternityData.cowId}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Fetch Data</button>
          </form>

          {fetchedData.length > 0 && (
            <table className="data-table" style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Calf ID</th>
                  <th>Gender</th>
                  <th>Calving Date</th>
                  <th>Lactation No</th>
                  <th>Calving Difficulty Score</th>
                  <th>BCS at Calving</th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.calfId}</td>
                    <td>{entry.calfGender}</td>
                    <td>{entry.calvingDate}</td>
                    <td>{entry.lactationNo}</td>
                    <td>{entry.calvingDifficultyScore}</td>
                    <td>{entry.bcsAtCalving}</td>
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

export default MaternityDetails;
