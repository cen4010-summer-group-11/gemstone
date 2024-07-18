// src/utils/api.js
const BASE_URL = 'http://localhost:3000';

export const getItems = async () => {
  const response = await fetch(`${BASE_URL}/item/`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      // add the bearer token at every request
      'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVuem8iLCJpYXQiOjE3MjEzMjY4MDEsImV4cCI6MTcyMTQ5OTYwMX0.I43b2p1SI3s58zOGro3t51NtccPA-IVcjWQzd-EDRSE`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return await response.json(); // response.json() returns a Promise, await
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
