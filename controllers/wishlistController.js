const Wishlist = require("../models/wishlistModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const addToWishList = async (req, res) => {
  try {
    
    const user = await User.findById(req.user.id);
    const product = await Product.findById(req.body.productId);



  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addToWishList,
};
