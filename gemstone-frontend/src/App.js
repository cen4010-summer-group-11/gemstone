import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import PriceManagement from './pages/PriceManagement';
import Invoices from './pages/Invoices';
import Reports from './pages/Reports';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/price-management" element={<PriceManagement />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
};

export default App;

