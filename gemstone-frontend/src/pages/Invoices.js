// src/pages/Invoices.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getInvoices } from '../utils/api';
import '../styles/styles.css'; // Import the CSS file

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices()
      .then(setInvoices)
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  return (
    <div className="page invoices-page">
      <Sidebar />
      <div className="page-content invoices-content">
        <div className="invoices-header">
          <input type="text" placeholder="Search Invoices..." className="search-bar" />
          <button className="create-invoice-button">Create New Invoice</button>
        </div>
        <table className="invoices-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                <td>{invoice.name}</td>
                <td>${invoice.total_price?.toFixed(2)}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>1 2 3 4 5 Next</span>
        </div>
      </div>
    </div>
  );
};

export default Invoices;

