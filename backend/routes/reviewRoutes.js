const express = require("express");
const router = express.Router();

const {
    addReview,
    getReviews,
    getAllReviews,
    deleteReview
} = require("../controllers/reviewController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Submit a review
router.post("/", authenticateUser, addReview);

// Get all reviews (admin only)
router.get("/", authenticateUser, authorizeAdmin, getAllReviews);

// Get reviews for a destination
router.get("/:destinationId", getReviews);

// Delete review (admin only)
router.delete("/:id", authenticateUser, authorizeAdmin, deleteReview);

module.exports = router;