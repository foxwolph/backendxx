// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number, // Use Number for price to allow for calculations
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    quantity_left_in_stock: {
      type: Number, // Use Number for quantity to allow for stock calculations
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Reference to the Category model
      required: true,
    },
    isInWishlist: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
