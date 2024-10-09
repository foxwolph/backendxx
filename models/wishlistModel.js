const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "users",
      required: true,
    },
    product: {
      name: { type: String },
      description: { type: String },
      price: { type: Number },
      image: { type: String },
      quantity_left_in_stock: { type: String },
      category: { type: String },
      isInWishlist: { type: Boolean },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("wishlists", wishlistSchema);
