const API_URL = 'http://localhost:3000/api';

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        throw new Error('Failed to login');
    }

    const data = await response.json();
    return data.token;
}

export const fetchProtectedData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/protected`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }

    return response.json();
}
