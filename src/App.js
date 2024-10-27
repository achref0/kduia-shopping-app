import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import CartValue from './components/CartValue';
import ExpenseList from './components/ExpenseList';
import ItemSelected from './components/ItemSelected';
import Location from './components/Location';


function App() {
  return (
    <div className="App">
      <h1>Hello y si zebii</h1>
      <CartValue /> {/* Add one component at a time */}
    </div>
  );
}

export default App;


