const db = require("../config/db");

// Create a new booking
const createBooking = (
    userId,
    destinationId,
    guideId,
    tourDate,
    notes,
    paymentMethod,
    paymentReference,
    callback
) => {

    const sql = `
        INSERT INTO bookings
        (user_id, destination_id, guide_id, tour_date, notes, payment_method, payment_reference)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId,
            destinationId,
            guideId,
            tourDate,
            notes,
            paymentMethod,
            paymentReference
        ],
        callback
    );
};

const getAllBookings = (callback) => {
    const sql = `
        SELECT b.id, b.user_id, b.destination_id, b.guide_id,
              b.tour_date, b.notes, b.status, 
b.payment_method, b.payment_reference, b.payment_status, 
b.created_at,
               u.full_name AS user_name, u.email AS user_email,
               g.name AS guide_name,
               d.name AS destination_name
        FROM bookings b
        LEFT JOIN users u ON b.user_id = u.id
        LEFT JOIN guides g ON b.guide_id = g.id
        LEFT JOIN destinations d ON b.destination_id = d.id
        ORDER BY b.created_at DESC
    `;
    db.query(sql, callback);
};

const getBookingById = (id, callback) => {
    const sql = "SELECT * FROM bookings WHERE id = ?";
    db.query(sql, [id], callback);
};

const updateBookingStatus = (id, status, callback) => {
    const sql = "UPDATE bookings SET status = ? WHERE id = ?";
    db.query(sql, [status, id], callback);
};

const updatePaymentStatus = (id, paymentStatus, callback) => {
    const sql = "UPDATE bookings SET payment_status = ? WHERE id = ?";
    db.query(sql, [paymentStatus, id], callback);
};

const deleteBooking = (id, callback) => {
    const sql = "DELETE FROM bookings WHERE id = ?";
    db.query(sql, [id], callback);
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    updatePaymentStatus,
    deleteBooking
};