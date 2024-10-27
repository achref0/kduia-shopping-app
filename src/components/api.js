import axios from 'axios';

// Set the base URL for the backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Adjust the URL if your backend API is hosted elsewhere
});

// Function to get data (e.g., products in your shopping app)
export const fetchProducts = async () => {
  try {
    const response = await api.get('/products'); // Replace '/products' with your actual API endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Function to add a product (e.g., adding an item to the shopping cart)
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Function to update a product (e.g., updating item quantity in the cart)
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await api.put(`/products/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Function to delete a product (e.g., removing an item from the cart)
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
