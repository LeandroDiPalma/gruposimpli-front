const API_BASE_URL = 'http://localhost:3000/api';

export const createDealer = async (dealer) => {
  const response = await fetch(`${API_BASE_URL}/dealers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(dealer)
  });
  if (!response.ok) throw new Error('Failed to create dealer');
  return await response.json();
};

export const updateDealer = async (id, dealer) => {
  const response = await fetch(`${API_BASE_URL}/dealers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(dealer)
  });
  if (!response.ok) throw new Error('Failed to update dealer');
  return await response.json();
};

export const deleteDealer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/dealers/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  if (!response.ok) throw new Error('Failed to delete dealer');
};

export const getDealers = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/dealers', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch dealers:", error);
        throw error;
    }
};