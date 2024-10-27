const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const addToWishList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.body.productId);

    // Check if the user and product exist
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addToWishList,
};
