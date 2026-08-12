const { createBooking } = require("../models/bookingModel");

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

module.exports = {
    createNewBooking
};