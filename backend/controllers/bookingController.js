const bookingModel = require("../models/bookingModel");
const { createBooking } = bookingModel;

// CREATE BOOKING
const createNewBooking = (req, res) => {

    const userId = req.user.id;

    const {
        destinationId,
        guideId,
        tourDate,
        notes
    } = req.body;

    // Validate required fields
    if (!destinationId || !guideId || !tourDate) {
        return res.status(400).json({
            success: false,
            message: "Destination, guide, and tour date are required."
        });
    }

    createBooking(
        userId,
        destinationId,
        guideId,
        tourDate,
        notes || null,
        (err, result) => {

            if (err) {
                console.error("Booking creation error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to create booking."
                });
            }

            res.status(201).json({
                success: true,
                message: "Booking request submitted successfully!",
                bookingId: result.insertId
            });

        }
    );
};

const getAllBookings = (req, res) => {
    bookingModel.getAllBookings((err, results) => {
        if (err) {
            console.error("Error fetching bookings:", err);
            return res.status(500).json({
                success: false,
                message: "Error fetching bookings"
            });
        }
        res.status(200).json(results);
    });
};

const updateBookingStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];

    if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be pending, confirmed, completed, or cancelled"
        });
    }

    bookingModel.updateBookingStatus(id, status, (err, result) => {
        if (err) {
            console.error("Error updating booking:", err);
            return res.status(500).json({
                success: false,
                message: "Error updating booking status"
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking status updated"
        });
    });
};

const deleteBooking = (req, res) => {
    const { id } = req.params;
    bookingModel.deleteBooking(id, (err, result) => {
        if (err) {
            console.error("Error deleting booking:", err);
            return res.status(500).json({
                success: false,
                message: "Error deleting booking"
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted"
        });
    });
};

module.exports = {
    createNewBooking,
    getAllBookings,
    updateBookingStatus,
    deleteBooking
};