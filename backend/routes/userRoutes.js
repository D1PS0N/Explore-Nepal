const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword
} = require("../controllers/userController");

const authenticateUser = require("../middleware/authMiddleware");


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Get profile
router.get("/profile", authenticateUser, getProfile);


// Update profile
router.put("/profile", authenticateUser, updateProfile);


// Forgot password
router.post("/forgot-password", forgotPassword);


// Reset password
router.put("/reset-password", resetPassword);


module.exports = router;