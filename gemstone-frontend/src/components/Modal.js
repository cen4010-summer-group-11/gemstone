// src/components/Modal.js
import React from 'react';
import '../styles/styles.css'; // Make sure to include your styles

const Modal = ({ isOpen, onClose, onAddItem }) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: Date.now(), // Simple way to generate unique ID
      item_name: event.target.itemName.value,
      metal_type: event.target.metalType.value,
      weight: parseFloat(event.target.weight.value),
      price: parseFloat(event.target.price.value),
      quantity: parseInt(event.target.quantity.value, 10),
    };
    onAddItem(newItem);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Item Name:</label>
            <input type="text" name="itemName" required />
          </div>
          <div className="input-group">
            <label>Metal Type:</label>
            <input type="text" name="metalType" required />
          </div>
          <div className="input-group">
            <label>Weight:</label>
            <input type="number" name="weight" step="0.01" required />
          </div>
          <div className="input-group">
            <label>Price:</label>
            <input type="number" name="price" step="0.01" required />
          </div>
          <div className="input-group">
            <label>Quantity:</label>
            <input type="number" name="quantity" required />
          </div>
          <button type="submit" className="add-item-button">Add Item</button>
        </form>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default Modal;
