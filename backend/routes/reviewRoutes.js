const express = require("express");
const router = express.Router();

const {
    addReview,
    getReviews
} = require("../controllers/reviewController");

const authenticateUser = require("../middleware/authMiddleware");

// Submit a review
router.post("/", authenticateUser, addReview);

// Get reviews for a destination
router.get("/:destinationId", getReviews);

module.exports = router;