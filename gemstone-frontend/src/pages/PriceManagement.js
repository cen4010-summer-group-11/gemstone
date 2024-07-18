// src/pages/PriceManagement.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css'; // Import the CSS file

const PriceManagement = () => {
  return (
    <div className="page price-management-page">
      <Sidebar />
      <div className="page-content price-management-content">
        <div className="current-metal-prices">
          <h2>Current Metal Prices</h2>
          <div>Gold: $1,500/oz</div>
          <div>Silver: $25/oz</div>
          <div>Platinum: $1,000/oz</div>
          <button className="update-prices-button">Update Prices</button>
        </div>
        <div className="profit-margin-calculator">
          <h2>Profit Margin Calculator</h2>
          <input type="text" placeholder="Cost" className="input-field" />
          <input type="text" placeholder="Selling Price" className="input-field" />
          <input type="text" placeholder="Profit Margin" className="input-field" />
          <button className="calculate-button">Calculate</button>
        </div>
        <div className="price-list">
          <h2>Price List</h2>
          <table className="price-list-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Base Price</th>
                <th>Markup %</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gold Ring</td>
                <td>$500</td>
                <td>10%</td>
                <td>$550</td>
              </tr>
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceManagement;



