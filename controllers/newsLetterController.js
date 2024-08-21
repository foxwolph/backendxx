const NewsLetter = require("../models/newsLetterModel");

const subscribeToNewsLetter = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "You must be signed in to subscribe to the newsletter",
    });
  }

  const { email } = req.body;
  const { firstName, lastName, gender } = req.user;

  try {
    const isSubscribed = await NewsLetter.findOne({ email });

    if (isSubscribed) {
      return res.status(400).json({
        message: "This email address is already subscribed to our newsletter",
      });
    }

    const newSubscription = new NewsLetter({ firstName, lastName, gender, email });
    await newSubscription.save();

    res.status(201).json({
      message: "You have successfully subscribed to our news letter.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { subscribeToNewsLetter };
