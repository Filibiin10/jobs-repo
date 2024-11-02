import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../Utilits/createToken.js";
import createToken from "../Utilits/createToken.js";
import asynchandler from "../MiddleWares/asyncHandler.js";
import jwt from "jsonwebtoken";
import Job from "../models/Job.js";

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    const id = newUser._id;

    const token = createToken(res, id);

    // Send user data
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: token, // Add token to response
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res .status(200) .json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const logoutCurrentUser = asynchandler(async (req, res) => {
  res.cookie("token", " ", {
    expires: new Date(0), // 10 minutes
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out" });
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findById(req.user.id);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCurrentUserProfile = asynchandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(401).send("error ayaa jiraa", error);
  }
  // const getCurrentUserProfile = asynchandler(async (req, res) => {
  //   try {
  //     const user = await User.findById(req.user.id);
  //     if (!user) return res.status(404).json({ message: "User not found" });
  //     res.json(user);
  //   } catch (error) {
  //     res.status(401).send("error ayaa jiraa");
  //   }
  // });
});
const updateUserProfile = asynchandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const checkUser = async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (user) {
    return res.json({ exists: true });
  }

  return res.json({ exists: false });
};

const getCategory = asynchandler(async (req, res) => {
  try {
    const categories = await Job.distinct('category');
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})
const getCategories = asynchandler(async (req, res) => {
  try {
    const categories = await Job.find({}); // Assuming 'category' is the field name
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export {
  createUser,
  getAllUsers,
  loginUser,
  logoutCurrentUser,
  getCurrentUserProfile,
  updateUserProfile,
  checkUser,
  getCategories,
  getCategory
};
