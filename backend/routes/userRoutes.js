const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin
} = require("../controllers/userController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

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

// ===============================
// ADMIN USER MANAGEMENT - US13
// ===============================

// View/Search all users
router.get(
  "/admin/users",
  authenticateUser,
  authorizeAdmin,
  getAllUsers
);

// Edit user
router.put(
  "/admin/users/:id",
  authenticateUser,
  authorizeAdmin,
  updateUserByAdmin
);

// Delete user
router.delete(
  "/admin/users/:id",
  authenticateUser,
  authorizeAdmin,
  deleteUserByAdmin
);

module.exports = router;