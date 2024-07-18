// src/pages/Dashboard.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css'; // Import the CSS file

const Dashboard = () => {
  return (
    <div className="page dashboard-page">
      <Sidebar />
      <div className="page-content dashboard-content">
        <div className="highlight-boxes">
          <div className="highlight-box total-value">Total Inventory Value: $1,234,567</div>
          <div className="highlight-box pending-orders">Pending Orders: 23</div>
          <div className="highlight-box low-stock">Low Stock Items: 7</div>
        </div>
        <div className="activity-sections">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <p>New order #1234 - $5,678</p>
            <p>Updated inventory - added 50 gold rings</p>
            <p>Price update - Silver increased by 2%</p>
          </div>
          <div className="notifications">
            <h2>Notifications</h2>
            <p>Low stock alert: Diamond rings</p>
            <p>New price updates available</p>
            <p>3 invoices pending approval</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



