const mongoose = require("mongoose");

const newsLetterModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subsriptionDate: {
    type: Date,
    default: Date.now,
  },
});

const NewsLetter = mongoose.model("NewsLetter", newsLetterModel);

module.exports = NewsLetter;
