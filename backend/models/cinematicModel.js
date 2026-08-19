const db = require("../config/db");

const getAllExpeditions = (callback) => {
    const sql = "SELECT * FROM cinematic_expeditions ORDER BY id ASC";
    db.query(sql, callback);
};

const getExpeditionById = (id, callback) => {
    const sql = "SELECT * FROM cinematic_expeditions WHERE id = ?";
    db.query(sql, [id], callback);
};

const createExpedition = (expedition, callback) => {
    const sql = `
        INSERT INTO cinematic_expeditions
        (title, category, tagline, description, features, image, price_range, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            expedition.title,
            expedition.category,
            expedition.tagline,
            expedition.description,
            expedition.features,
            expedition.image,
            expedition.price_range,
            expedition.status
        ],
        callback
    );
};

const updateExpedition = (id, expedition, callback) => {
    const sql = `
        UPDATE cinematic_expeditions
        SET title = ?,
            category = ?,
            tagline = ?,
            description = ?,
            features = ?,
            image = ?,
            price_range = ?,
            status = ?
        WHERE id = ?
    `;
    db.query(
        sql,
        [
            expedition.title,
            expedition.category,
            expedition.tagline,
            expedition.description,
            expedition.features,
            expedition.image,
            expedition.price_range,
            expedition.status,
            id
        ],
        callback
    );
};

const deleteExpedition = (id, callback) => {
    const sql = "DELETE FROM cinematic_expeditions WHERE id = ?";
    db.query(sql, [id], callback);
};

module.exports = {
    getAllExpeditions,
    getExpeditionById,
    createExpedition,
    updateExpedition,
    deleteExpedition
};
