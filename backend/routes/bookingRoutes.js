const express = require("express");

const router = express.Router();

const {
    createNewBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking
} = require("../controllers/bookingController");

const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Create booking
router.post("/", authenticateUser, createNewBooking);

// Get all bookings (admin only)
router.get("/", authenticateUser, authorizeAdmin, getAllBookings);

// Update booking status (admin only)
router.put("/:id/status", authenticateUser, authorizeAdmin, updateBookingStatus);

// Delete booking (admin only)
router.delete("/:id", authenticateUser, authorizeAdmin, deleteBooking);

module.exports = router;