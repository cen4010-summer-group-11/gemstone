// src/pages/Inventory.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getItems } from '../utils/api';
import '../styles/styles.css'; // Import the CSS file

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems()
      .then(setItems)
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="page inventory-page">
      <Sidebar />
      <div className="page-content inventory-content">
        <div className="inventory-header">
          <input type="text" placeholder="Search inventory..." className="search-bar" />
          <button className="add-item-button">Add Item</button>
        </div>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Metal</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.item_name}</td>
                <td>{item.metal_type}</td>
                <td>{item.weight}</td>
                <td>${item.price?.toFixed(2)}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;



