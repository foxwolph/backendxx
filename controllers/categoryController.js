const Category = require("../models/categoryModel");


const createCategories = async (req, res) => {
  try {
    const categories = [
      {
        name: "Clothing",
        description:
          "Explore our vast collection of stylish clothing for men and women, including tops, bottoms, dresses, outerwear, and more.",
      },
      {
        name: "Shoes",
        description:
          "Step up your shoe game with our trendy and comfortable footwear collection, featuring boots, heels, flats, sneakers, and sandals.",
      },
      {
        name: "Accessories",
        description:
          "Elevate your style with our wide range of fashion accessories, including jewelry, hats, scarves, belts, bags, and wallets.",
      },
      {
        name: "Jewelry",
        description:
          "Add a touch of glamour to your outfit with our stunning jewelry collection, featuring necklaces, earrings, rings, and more.",
      },
      {
        name: "Handbags & wallets",
        description:
          "Carry your essentials in style with our collection of handbags, wallets, and clutches, designed for both function and fashion.",
      },
    ];

    for (const category of categories) {
      await Category.create(category);
    }

    res.status(200).json({ message: "Categories created successfully" });
    console.log("Categories created successfully");
  } catch (error) {
    console.error(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createCategories,
  getAllCategories,
};
