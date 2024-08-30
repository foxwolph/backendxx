const express = require("express");
const Product = require("../models/productModel");
const { adminAuth } = require("../middleware/authmiddleware");

const {
  createProduct,
  getAllProducts,
  getProductsByCategory,
} = require("../controllers/productController");

const router = express.Router();

// Create a new product
router.route("/create-product").post(createProduct);

// Get all products
router.route("/get-all-products").get(getAllProducts);

// Get all products by category
router.route("/all-products/:categoryId").get(getProductsByCategory);

module.exports = router;
