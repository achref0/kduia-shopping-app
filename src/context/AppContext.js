import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [cartValue, setCartValue] = useState(0); // Initialize cart value here

  return (
    <AppContext.Provider value={{ cartValue, setCartValue }}>
      {children}
    </AppContext.Provider>
  );
};
