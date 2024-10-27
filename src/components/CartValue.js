import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartValue = () => {
  const { cartValue } = useContext(AppContext); // Access cartValue

  return (
    <div>
      <h2>Cart Value</h2>
      <p>Total: {cartValue}</p> {/* Display the cart value */}
    </div>
  );
};

export default CartValue;


