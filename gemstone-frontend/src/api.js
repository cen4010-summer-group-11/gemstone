// src/utils/api.js
const BASE_URL = 'http://localhost:3000/api';

export const getInvoices = async () => {
  try {
    const response = await fetch(`${BASE_URL}/invoices`);
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getInvoices:", error);
    throw error;
  }
};

export const getPurchases = async () => {
  try {
    const response = await fetch(`${BASE_URL}/purchases`);
    if (!response.ok) {
      throw new Error('Failed to fetch purchases');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getPurchases:", error);
    throw error;
  }
};

// Add other API functions as needed
