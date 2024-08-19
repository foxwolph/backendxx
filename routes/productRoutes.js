const express = require('express');
const Product = require('../models/productModel');
const { adminAuth } = require('../middleware/authmiddleware'); 

const router = express.Router();

// Create product (admin only)
router.post('/', adminAuth, async (req, res) => {
  const { name, description, price, category, quantity_left_in_stock } = req.body;

  try {
    const product = new Product({ name, description, price, category, quantity_left_in_stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
