// src/pages/Reports.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css'; // Import the CSS file

const Reports = () => {
  return (
    <div className="page reports-page">
      <Sidebar />
      <div className="page-content reports-content">
        <div className="generate-report">
          <h2>Generate Report</h2>
          <button className="report-button">Sales Report</button>
          <button className="report-button">Inventory Report</button>
          <button className="report-button">Price Trends</button>
          <button className="report-button">Custom Report</button>
        </div>
        <div className="date-range">
          <label>Date Range:</label>
          <input type="date" className="date-input" />
          <input type="date" className="date-input" />
          <button className="apply-button">Apply</button>
        </div>
        <div className="report-preview">
          <h2>Report Preview</h2>
          <div className="chart-placeholder">
            {/* Placeholder for chart */}
          </div>
          <button className="export-button">Export Report</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;


