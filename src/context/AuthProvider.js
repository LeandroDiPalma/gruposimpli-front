import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleLoginSuccess = (token) => {
        localStorage.setItem('token', token);
        setAuthToken(token);
    };

    const handleError = (error) => {
        if (error.status === 500) {
            localStorage.removeItem('token');
            setAuthToken(null);
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, handleLoginSuccess, handleError }}>
            {children}
        </AuthContext.Provider>
    );
};
