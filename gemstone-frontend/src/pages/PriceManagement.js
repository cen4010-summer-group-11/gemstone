// src/pages/PriceManagement.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css'; 

const dummyPriceList = [
  { item: 'Gold Ring', basePrice: 500, markup: 10, finalPrice: 550 },
  { item: 'Silver Necklace', basePrice: 300, markup: 15, finalPrice: 345 },
  { item: 'Platinum Bracelet', basePrice: 700, markup: 20, finalPrice: 840 },
  { item: 'Diamond Earrings', basePrice: 1500, markup: 25, finalPrice: 1875 },
  { item: 'Gold Necklace', basePrice: 2000, markup: 10, finalPrice: 2200 },
  // Add more items here
];

const PriceManagement = () => {
  const [metalPrices, setMetalPrices] = useState({
    gold: 1500,
    silver: 25,
    platinum: 1000,
  });
  const [cost, setCost] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [profitMargin, setProfitMargin] = useState('');

  const calculateProfitMargin = () => {
    if (cost && sellingPrice) {
      const margin = ((sellingPrice - cost) / cost) * 100;
      setProfitMargin(margin.toFixed(2));
    }
  };

  const updateMetalPrices = () => {
    const newPrices = {
      gold: (Math.random() * 1000 + 1000).toFixed(2),
      silver: (Math.random() * 20 + 20).toFixed(2),
      platinum: (Math.random() * 500 + 500).toFixed(2),
    };
    setMetalPrices(newPrices);
  };

  return (
    <div className="page price-management-page">
      <Sidebar />
      <div className="page-content price-management-content">
        <div className="current-metal-prices">
          <h2>Current Metal Prices</h2>
          <div>Gold: ${metalPrices.gold}/oz</div>
          <div>Silver: ${metalPrices.silver}/oz</div>
          <div>Platinum: ${metalPrices.platinum}/oz</div>
          <button className="update-prices-button" onClick={updateMetalPrices}>Update Prices</button>
        </div>
        <div className="profit-margin-calculator">
          <h2>Profit Margin Calculator</h2>
          <input
            type="text"
            placeholder="Cost"
            className="input-field"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <input
            type="text"
            placeholder="Selling Price"
            className="input-field"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />
          <input
            type="text"
            placeholder="Profit Margin"
            className="input-field"
            value={profitMargin}
            readOnly
          />
          <button className="calculate-button" onClick={calculateProfitMargin}>
            Calculate
          </button>
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
              {dummyPriceList.map((item, index) => (
                <tr key={index}>
                  <td>{item.item}</td>
                  <td>${item.basePrice.toFixed(2)}</td>
                  <td>{item.markup}%</td>
                  <td>${item.finalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PriceManagement;




