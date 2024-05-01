// src/api/vehicleApi.js
const API_URL = 'http://localhost:3000/api';

export const getVehicles = async (dealerId) => {
    const response = await fetch(`${API_URL}/dealer/${dealerId}/vehicles`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};

export const createVehicle = async (dealerId, vehicleData) => {
    const dataWithDealerId = { ...vehicleData, dealer: dealerId };
    const response = await fetch(`${API_URL}/dealer/${dealerId}/vehicles`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataWithDealerId)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};

export const updateVehicle = async (dealerId, vehicleId, vehicleData) => {
    const response = await fetch(`${API_URL}/dealer/${dealerId}/vehicles/${vehicleId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vehicleData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};

export const deleteVehicle = async (dealerId,vehicleId) => {
    const response = await fetch(`http://localhost:3000/api/dealer/${dealerId}/vehicles/${vehicleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` 
      }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      return {};
    }
  };
  