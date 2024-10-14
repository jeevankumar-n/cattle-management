import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './dashboard.css'; // Assuming you have some CSS for styling

const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = () => {
    // Add any necessary logout logic here (like clearing tokens)
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="dashboard-container">
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Dashboard</h2>
      <div className="dashboard-menu">
        <div className="dashboard-item" onClick={() => navigate('/dashboard/milk-details')}>
          <h3>Milk Details</h3>
          <p>View and manage milk production records</p>
        </div>

        <div className="dashboard-item" onClick={() => navigate('/dashboard/health-details')}>
          <h3>Health Details</h3>
          <p>Track and manage health records</p>
        </div>

        <div className="dashboard-item" onClick={() => navigate('/dashboard/maternity-details')}>
          <h3>Maternity Details</h3>
          <p>Manage maternity and breeding information</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
