const express = require("express");

const router = express.Router();

const { createNewBooking } = require("../controllers/bookingController");

const authenticateUser = require("../middleware/authMiddleware");

// Create booking
router.post("/", authenticateUser, createNewBooking);

module.exports = router;