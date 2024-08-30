const Product = require("../models/productModel");
const Category = require("../models/categoryModel");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      quantity_left_in_stock,
      category,
    } = req.body;

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
  } catch (error) {
    console.error("Error creating product: ", error);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    if (products.length <= 0) {
      return res.status(404).json({ message: "No products found" });
    } else {
      res.status(200).json({ totalProducts: products.length, products });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
    console.error(error);
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
    return res.status(500).json({ message: `Server error: ${error.message}` });
    console.error(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
};
