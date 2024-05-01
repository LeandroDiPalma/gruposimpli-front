import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({ message: '', type: '' });

  const addNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: '', type: '' }), 3000);  
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {notification.message && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
          {notification.message}
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};
