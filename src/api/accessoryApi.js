const API_URL = 'http://localhost:3000/api';

export const getAccessories = async (dealerId) => {
    const response = await fetch(`${API_URL}/dealer/${dealerId}/accessories`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch accessories: Status ${response.status}`);
    }
    return await response.json();
};

export const deleteAccessory = async (dealerId, accessoryId) => {
    const response = await fetch(`http://localhost:3000/api/dealer/${dealerId}/accessories/${accessoryId}`, {
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



export const updateAccessory = async (dealerId, accessoryId, accessoryData) => {
    const response = await fetch(`${API_URL}/dealer/${dealerId}/accessories/${accessoryId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(accessoryData)
    });
    if (!response.ok) {
        throw new Error(`Failed to update accessory: Status ${response.status}`);
    }
    return await response.json();
};

export const createAccessory = async (dealerId, accessoryData) => {
    const response = await fetch(`${API_URL}/dealer/${dealerId}/accessories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(accessoryData)
    });
    if (!response.ok) {
        throw new Error(`Failed to create accessory: Status ${response.status}`);
    }
    return await response.json();
};
