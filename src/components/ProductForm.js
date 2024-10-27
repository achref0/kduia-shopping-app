// src/components/ProductForm.js

import React, { useState } from 'react';
import { createProduct } from './api';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProduct({ name, price });
        setName('');
        setPrice('');
        alert('Product created successfully');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
