const express = require("express");
const router = express.Router();

const { addToWishList } = require("../controllers/wishlistController.js");

router.route("/add-to-wishlist").post(addToWishList);

module.exports = router;
