// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/price-management">Price Management</Link></li>
          <li><Link to="/invoices">Invoices</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


