import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [cartValue, setCartValue] = useState(0); // Initialize cart value here
  const [expenses, setExpenses] = useState([
    { name: 'Item 1', price: 25 },
    { name: 'Item 2', price: 75 },
  ]);
  const [selectedItem, setSelectedItem] = useState({ name: 'Item 1', price: 25 });
  const [location, setLocation] = useState('New York');

  const contextValue = {
    cartValue,
    expenses,
    selectedItem,
    location,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
