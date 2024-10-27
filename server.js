// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can choose any port you prefer

app.use(cors());
app.use(bodyParser.json());

// Sample data
let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 150 },
  { id: 3, name: 'Product 3', price: 200 },
];

let cart = [];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Add a product to the cart
app.post('/api/cart', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    res.json({ message: 'Product added to cart', cart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Get all items in the cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Remove an item from the cart by product ID
app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== productId);
  res.json({ message: 'Product removed from cart', cart });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
