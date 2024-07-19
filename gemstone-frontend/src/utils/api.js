// src/utils/api.js
const BASE_URL = 'http://localhost:3000';

export const getItems = async (bearerToken) => {
  const response = await fetch(`${BASE_URL}/item/`, {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      // add the bearer token at every request
      Authorization: bearerToken,
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

export const getInvoices = async (bearerToken) => {
    const response = await fetch(`${BASE_URL}/invoice/`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch invoices');
    }
    return await response.json(); // response.json() returns a Promise, await
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

export const getPurchases = async (bearerToken) => {
    const response = await fetch(`${BASE_URL}/purchase/`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        Authorization: bearerToken,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch purchases');
    }
    return await response.json(); // response.json() returns a Promise, await
  }
  
export const registerUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    console.error(response);
  }
  return await response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    console.error(response);
  }
  return await response.json();
};

export const authUser = async (bearerToken) => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': bearerToken,
    },
  });
  const json = await response.json();
  if (!json.ok) {
    console.error(json);
  }
  return json
};
