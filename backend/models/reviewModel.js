const db = require("../config/db");

const Review = {
    create: (userId, destinationId, rating, review, callback) => {
        const sql = `
            INSERT INTO reviews (user_id, destination_id, rating, review)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [userId, destinationId, rating, review], callback);
    },

    getByDestination: (destinationId, callback) => {
        const sql = `
            SELECT r.id, r.rating, r.review, r.created_at,
                   u.full_name AS user_name
            FROM reviews r
            JOIN users u ON r.user_id = u.id
            WHERE r.destination_id = ?
            ORDER BY r.created_at DESC
        `;
        db.query(sql, [destinationId], callback);
    },

    getAll: (callback) => {
        const sql = `
            SELECT r.id, r.user_id, r.destination_id, r.rating,
                   r.review, r.created_at,
                   u.full_name AS user_name,
                   d.name AS destination_name
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            LEFT JOIN destinations d ON r.destination_id = d.id
            ORDER BY r.created_at DESC
        `;
        db.query(sql, callback);
    },

    deleteById: (id, callback) => {
        const sql = "DELETE FROM reviews WHERE id = ?";
        db.query(sql, [id], callback);
    }
};

module.exports = Review;