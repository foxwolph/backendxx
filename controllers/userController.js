const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address = {},
    gender,
    password,
    profilePicture,
  } = req.body;

  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !address?.street ||
      !address?.city ||
      !address?.district ||	
      !gender ||
      !password
    ) {
      return res.status(400).json({ message: "Please fill in all fields!" });
    }

    // Check if user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email address already exists" });
    }

    // Create new user
    let newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      address: {
        street: address.street || null,
        city: address.city || null,
        district: address.district || null,
        postalCode: address.postalCode || null,
      },
      gender,
      password,
      profilePicture,
    }); // Create new user
    const saveUser = await newUser.save();

    if(saveUser){
       // Generate JWT token
    const token = jwt.sign(
      {
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          address: newUser.address,
          gender: newUser.gender,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({token: token, user: saveUser});
    } else{
      res.status(400).json({message: "Unable to register user."});
    }

   
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please type in your credentials." });
    }

    // Find user by email
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "No user found with this email address." });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        user: {
          id: existingUser._id,
          existingUser,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          phoneNumber: existingUser.phoneNumber,
          address: existingUser.address,
          gender: existingUser.gender,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({token: token, user: existingUser});
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
