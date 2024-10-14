import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './home';           // Home component
import SignUp from './signup';       // SignUp component
import Login from './login';         // Login component
import Explore from './explore';     // Explore component
import Dashboard from './components/Dashboard'; // Dashboard component
import MilkDetails from './components/MilkDetails';       // Milk Details component
import HealthDetails from './components/HealthDetails';   // Health Details component
import MaternityDetails from './components/MaternityDetails'; // Maternity Details component

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/components/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/milk-details" element={<MilkDetails />} />

        <Route path="/dashboard/health-details" element={<HealthDetails />} />
        <Route path="/dashboard/maternity-details" element={<MaternityDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
