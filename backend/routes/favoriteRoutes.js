const express = require("express");
const router = express.Router();

const {
    addFavorite,
    getFavorites,
    removeFavorite
} = require("../controllers/favoriteController");

const authenticateUser = require("../middleware/authMiddleware");

// Add a favorite
router.post("/", authenticateUser, addFavorite);

// Get logged-in user's favorites
router.get("/", authenticateUser, getFavorites);

// Remove a favorite
router.delete("/:destinationId", authenticateUser, removeFavorite);

module.exports = router;