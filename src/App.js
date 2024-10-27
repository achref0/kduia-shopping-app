import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CartValue from './components/CartValue';
import ExpenseList from './components/ExpenseList';
import ItemSelected from './components/ItemSelected';
import Location from './components/Location';


function App() {
  return (
    <div className="App">
      <h1>Shopping App</h1>
      <CartValue /> {/* Add one component at a time */}
      <ExpenseList />
      <ItemSelected />
      <Location />
    </div>
  );
}

export default App;


