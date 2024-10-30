// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the database connection
const db = require('./db');

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(bodyParser.json());

let cart = []; // Retain in-memory cart for simplicity

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching products', error });
    }
    res.json(results);
  });
});

// Get a specific product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  db.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching product', error });
    }
    if (results.length) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});

// Add a new product
app.post('/api/products', (req, res) => {
  const { name, price, description } = req.body;

  // Validate input
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Name, price, and description are required' });
  }

  const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
  db.query(query, [name, price, description], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error adding product', error });
    }

    const newProduct = { id: results.insertId, name, price, description };
    res.status(201).json({
      message: 'Product added successfully',
      product: newProduct
    });
  });
});

// Add a product to the cart
app.post('/api/cart', (req, res) => {
  const { productId } = req.body;

  // Find the product by ID in the products table to ensure it exists
  const findProductQuery = 'SELECT * FROM products WHERE id = ?';
  
  db.query(findProductQuery, [productId], (err, results) => {
    if (err) {
      console.error('Error finding product:', err);
      res.status(500).json({ message: 'Database error while finding product' });
      return;
    }

    // If the product is found, insert its ID into the cart table
    if (results.length > 0) {
      const addToCartQuery = 'INSERT INTO cart (product_id) VALUES (?)';
      
      db.query(addToCartQuery, [productId], (err, cartResult) => {
        if (err) {
          console.error('Error adding product to cart:', err);
          res.status(500).json({ message: 'Database error while adding to cart' });
          return;
        }

        res.status(201).json({ message: 'Product added to cart successfully', cartId: cartResult.insertId });
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});



// Get all items in the cart
app.get('/api/cart', (req, res) => {
  const getCartQuery = `
    SELECT cart.id AS cartId, cart.product_id, products.name, products.price, products.description
    FROM cart
    JOIN products ON cart.product_id = products.id
  `;

  db.query(getCartQuery, (err, results) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      res.status(500).json({ message: 'Database error while fetching cart items' });
      return;
    }

    res.json(results);
  });
});



// Remove an item from the cart by product ID
app.delete('/api/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== productId); // Filter in-memory cart
  res.json({ message: 'Product removed from cart', cart });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
