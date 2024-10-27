const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Product = require("../models/productModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

// Configure multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../data")); // Save files to the ../data directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid filename conflicts
  },
});

const upload = multer({ storage: storage });

async function createProduct(req, res) {
  try {
    // Use multer middleware to handle file uploads
    const uploadSingle = upload.single("image");
    uploadSingle(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err });
      }

      const { name, description, price, quantity_left_in_stock, category } =
        req.body;
      const image = req.file ? `/data/${req.file.filename}` : null; // Use the path to the uploaded image

      const product = await Product.create({
        name,
        description,
        price,
        image,
        quantity_left_in_stock,
        category,
      });

      await product.save();

      res.status(201).json({ message: "Product created successfully" });
      console.log("Product created successfully");
    });
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).json({ message: "Error creating product" });
  }
}

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length <= 0) {
      return res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json({ totalProducts: products.length, products });
    }
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res
        .status(404)
        .json({ message: `No category with the id ${categoryId} found!` });
    }

    const products = await Product.find({ category: categoryId });

    if (!products) {
      return res
        .status(404)
        .json({ message: "No products found associated with this category" });
    }

    res.status(200).json({
      message: `Successfully fetched products with category: ${category.name}`,
      totalProducts: products.length,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products by category: ", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
};
