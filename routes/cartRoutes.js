const express = require("express");
const router = express.Router();

const {
  addToCart,
  getUserCart,
  removeFromCart,
  syncUserCart,
} = require("../controllers/cartController");

// Add to cart
router.route("/add-to-cart").post(addToCart);

// Get user cart
router.route("/get-cart/:userId").get(getUserCart);

// Remove item from cart
router.route("/remove-from-cart").post(removeFromCart);

// Sync user cart with backend
router.route("/sync").post(syncUserCart);

module.exports = router;
