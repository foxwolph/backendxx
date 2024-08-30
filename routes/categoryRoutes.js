const express = require("express");
const { createCategories, getAllCategories } = require("../controllers/categoryController");
const router = express.Router();

router.route("/create-categories").post(createCategories);
router.route("/get-all-categories").get(getAllCategories);

module.exports = router;
