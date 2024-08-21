const express = require("express");
const router = express.Router();
const newsLetterController = require("../controllers/newsLetterController");
const { authenticateUser } = require("../middlewares/authenticateUser");

router.post(
  "/subscribe",
  authenticateUser,
  newsLetterController.subscribeToNewsLetter
);

module.exports = router;
