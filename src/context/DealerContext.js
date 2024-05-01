import React, { createContext, useState, useContext } from 'react';

const DealerContext = createContext(null);

export const useDealer = () => useContext(DealerContext);

export const DealerProvider = ({ children }) => {
  const [dealer, setDealer] = useState(null);

  const updateDealerContext = (dealer) => {
    setDealer(dealer);
    localStorage.setItem('selectedDealer', JSON.stringify(dealer));
  };
  

  return (
    <DealerContext.Provider value={{ dealer, updateDealerContext }}>
      {children}
    </DealerContext.Provider>
  );
};
