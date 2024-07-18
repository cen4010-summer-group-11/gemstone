// src/utils/api.js
const BASE_URL = 'http://localhost:3000/api';

export const getItems = async () => {
  const response = await fetch(`${BASE_URL}/item/`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const getItem = async (id) => {
  const response = await fetch(`${BASE_URL}/item/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch item with id ${id}`);
  }
  return response.json();
};

export const createItem = async (item) => {
  const response = await fetch(`${BASE_URL}/item/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ item }),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

export const deleteItem = async (id) => {
  const response = await fetch(`${BASE_URL}/item/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete item with id ${id}`);
  }
  return response.json();
};

export const getInvoices = async () => {
  const response = await fetch(`${BASE_URL}/invoice/`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  return response.json();
};

export const createInvoice = async (invoice) => {
  const response = await fetch(`${BASE_URL}/invoice/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ invoice }),
  });
  if (!response.ok) {
    throw new Error('Failed to create invoice');
  }
  return response.json();
};

export const getPurchases = async () => {
  const response = await fetch(`${BASE_URL}/purchase/`);
  if (!response.ok) {
    throw new Error('Failed to fetch purchases');
  }
  return response.json();
};

export const createPurchase = async (purchase) => {
  const response = await fetch(`${BASE_URL}/purchase/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ purchase }),
  });
  if (!response.ok) {
    throw new Error('Failed to create purchase');
  }
  return response.json();
};
