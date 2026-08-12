const db = require("../config/db");

// Create a new booking
const createBooking = (
    userId,
    destinationId,
    guideId,
    tourDate,
    notes,
    callback
) => {

    const sql = `
        INSERT INTO bookings
        (user_id, destination_id, guide_id, tour_date, notes)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [userId, destinationId, guideId, tourDate, notes],
        callback
    );
};

module.exports = {
    createBooking
};