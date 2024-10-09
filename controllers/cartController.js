const User = require("../models/userModel");
const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      // If the product is already in the cart, update the quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // If not, add the product to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to add item to cart", error });
  }
};

const getUserCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cart", error });
  }
};

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove item from cart",
      error,
    });
  }
};

const syncUserCart = async (req, res) => {
  const { userId, cart } = req.body;

  try {
    let userCart = await Cart.findOne({ userId });

    if (!userCart) {
      // If no user cart exists, create a new one
      userCart = new Cart({ userId, items: cart });
    } else {
      // Merge anonymous cart items with the user's cart
      cart.forEach((item) => {
        const existingItem = userCart.items.find(
          (i) => i.productId.toString() === item.productId
        );
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          userCart.items.push(item);
        }
      });
    }

    await userCart.save();
    return res.status(200).json({ cart: userCart });
  } catch (error) {
    return res.status(500).json({ message: "Failed to sync cart", error });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  removeFromCart,
  syncUserCart,
};
