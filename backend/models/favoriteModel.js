const db = require("../config/db");

// Add a destination to user's favorites
const addFavorite = (userId, destinationId, callback) => {
    const sql = `
        INSERT INTO favorites (user_id, destination_id)
        VALUES (?, ?)
    `;

    db.query(sql, [userId, destinationId], callback);
};

// Get all favorite destinations for a user
const getFavoritesByUser = (userId, callback) => {
    const sql = `
        SELECT 
            favorites.id,
            favorites.destination_id,
            destinations.name,
            destinations.location,
            destinations.description,
            destinations.image,
            destinations.attractions,
            favorites.created_at
        FROM favorites
        JOIN destinations
            ON favorites.destination_id = destinations.id
        WHERE favorites.user_id = ?
        ORDER BY favorites.created_at DESC
    `;

    db.query(sql, [userId], callback);
};

// Remove a destination from user's favorites
const removeFavorite = (userId, destinationId, callback) => {
    const sql = `
        DELETE FROM favorites
        WHERE user_id = ? AND destination_id = ?
    `;

    db.query(sql, [userId, destinationId], callback);
};

module.exports = {
    addFavorite,
    getFavoritesByUser,
    removeFavorite
};