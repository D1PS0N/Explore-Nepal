const db = require("../config/db");

const getAllDestinations = (callback) => {
    const sql = "SELECT * FROM destinations";
    db.query(sql, callback);
};

const createDestination = (destination, callback) => {
    const sql = `
        INSERT INTO destinations
        (name, location, description, image, attractions)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            destination.name,
            destination.location,
            destination.description,
            destination.image,
            destination.attractions
        ],
        callback
    );
};

const updateDestination = (id, destination, callback) => {
    const sql = `
        UPDATE destinations
        SET name = ?,
            location = ?,
            description = ?,
            image = ?,
            attractions = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            destination.name,
            destination.location,
            destination.description,
            destination.image,
            destination.attractions,
            id
        ],
        callback
    );
};

const deleteDestination = (id, callback) => {
    const sql = "DELETE FROM destinations WHERE id = ?";
    db.query(sql, [id], callback);
};

const getRecommendedDestinations = (interests, callback) => {
    if (!interests || interests.length === 0) {
        return callback(null, []);
    }

    const conditions = interests.map(() => "interests LIKE ?").join(" OR ");
    const values = interests.map(interest => `%${interest}%`);

    const sql = `
        SELECT *
        FROM destinations
        WHERE ${conditions}
    `;

    db.query(sql, values, callback);
};

module.exports = {
    getAllDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
    getRecommendedDestinations
};