export const getLeads = async (dealerId) => {
    const response = await fetch(`http://localhost:3000/api/dealer/${dealerId}/leads`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};