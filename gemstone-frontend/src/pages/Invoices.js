// src/pages/Invoices.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/styles.css'; 

const dummyInvoices = [
  { id: 163676722375, name: 'John Doe', created_at: '2024-01-01', total_price: 1200, status: 'Paid' },
  { id: 223367713157, name: 'Jane Smith', created_at: '2024-02-15', total_price: 800, status: 'Paid' },
  { id: 331137671324, name: 'Emil Diaz', created_at: '2024-03-10', total_price: 4500, status: 'Paid' },
  { id: 4224466767643, name: 'Michael Johnson', created_at: '2024-03-15', total_price: 3500, status: 'Unpaid' },
  { id: 5428376766428, name: 'David Brown', created_at: '2024-04-01', total_price: 2600, status: 'Paid' },
  { id: 6274398777494, name: 'Linda Martinez', created_at: '2024-04-10', total_price: 1450, status: 'Unpaid' },
  { id: 747284443294, name: 'James Wilson', created_at: '2024-05-01', total_price: 1150, status: 'Paid' },
  { id: 814442834443, name: 'Patricia Garcia', created_at: '2024-05-15', total_price: 2950, status: 'Paid' },
  { id: 234424434449, name: 'Christopher Clark', created_at: '2024-06-01', total_price: 4800, status: 'Paid' },
  { id: 124234233240, name: 'Jessica Lewis', created_at: '2024-06-10', total_price: 900, status: 'Unpaid' },
  { id: 468713241431, name: 'Matthew Lee', created_at: '2024-06-20', total_price: 1700, status: 'Paid' },
  { id: 646546461432, name: 'Sarah Walker', created_at: '2024-07-01', total_price: 1250, status: 'Paid' },
  { id: 5464664771343, name: 'Andrew Hall', created_at: '2024-07-10', total_price: 3100, status: 'Unpaid' },
  { id: 6463353646344, name: 'Laura Allen', created_at: '2024-07-15', total_price: 1900, status: 'Paid' },
  { id: 4577756771543, name: 'Brian King', created_at: '2024-07-20', total_price: 2400, status: 'Paid' },
  { id: 1473843845443, name: 'Sophia Wright', created_at: '2024-07-25', total_price: 3500, status: 'Unpaid' },
  { id: 1735322342443, name: 'Daniel Scott', created_at: '2024-08-01', total_price: 7200, status: 'Paid' },
  { id: 2432441424834, name: 'Olivia Adams', created_at: '2024-08-05', total_price: 2800, status: 'Paid' },
  { id: 8277433412943, name: 'Joshua Baker', created_at: '2024-08-10', total_price: 3400, status: 'Unpaid' },
  { id: 33242424420234, name: 'Mia Hill', created_at: '2024-08-15', total_price: 3800, status: 'Paid' },
  { id: 93833884421343, name: 'Ethan Harris', created_at: '2024-08-20', total_price: 4400, status: 'Paid' },
  { id: 75834539522343, name: 'Ava Young', created_at: '2024-08-25', total_price: 1500, status: 'Paid' },
  { id: 22948493943453, name: 'William Nelson', created_at: '2024-09-01', total_price: 6200, status: 'Paid' },
  { id: 1213241317154, name: 'Isabella Carter', created_at: '2024-09-05', total_price: 1300, status: 'Paid' },
  { id: 42377757725454, name: 'James Rivera', created_at: '2024-09-10', total_price: 1800, status: 'Unpaid' },
  { id: 6504969426585, name: 'Amelia Phillips', created_at: '2024-09-15', total_price: 500, status: 'Paid' },
];

const Invoices = () => {
  const [invoices, setInvoices] = useState(dummyInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    name: '',
    total_price: '',
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleAddInvoice = () => {
    const totalPriceNumber = parseFloat(newInvoice.total_price);
    if (isNaN(totalPriceNumber)) {
      alert('Total price must be a number');
      return;
    }

    setInvoices([...invoices, { ...newInvoice, id: Date.now(), created_at: new Date().toISOString(), total_price: totalPriceNumber, status: 'Unpaid' }]);
    setIsModalOpen(false);
    setNewInvoice({ name: '', total_price: '' });
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.id.toString().includes(searchTerm.toLowerCase()) ||
    invoice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(invoice.created_at).toLocaleDateString().includes(searchTerm.toLowerCase()) ||
    invoice.total_price.toString().includes(searchTerm.toLowerCase()) ||
    invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page invoices-page">
      <Sidebar />
      <div className="page-content invoices-content">
        <div className="invoices-header">
          <input
            type="text"
            placeholder="Search Invoices..."
            className="search-bar"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="create-invoice-button" onClick={() => setIsModalOpen(true)}>Create New Invoice</button>
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
            {filteredInvoices.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                <td>{invoice.name}</td>
                <td>${invoice.total_price.toFixed(2)}</td>
                <td>{invoice.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>1 2 3 4 5 Next</span>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Add New Invoice</h2>
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={newInvoice.name}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="total_price"
              placeholder="Total Price"
              value={newInvoice.total_price}
              onChange={handleInputChange}
            />
            <button onClick={handleAddInvoice}>Add Invoice</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
