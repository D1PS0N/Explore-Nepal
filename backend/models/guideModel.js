const db = require("../config/db");

const getAllGuides = (callback) => {
    const sql = "SELECT * FROM guides";

    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, results);
    });
};

const getGuidesByDestination = (destinationId, callback) => {
    const sql = "SELECT * FROM guides WHERE destination_id = ?";

    db.query(sql, [destinationId], (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }

        callback(null, results);
    });
};

const createGuide = (guide, callback) => { const sql = "INSERT INTO guides (name, destination_id, role, expertise, bio, languages, specialties, contact, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; db.query(sql, [guide.name, guide.destination_id, guide.role, guide.expertise, guide.bio, guide.languages, guide.specialties, guide.contact, guide.profile_image], callback); }; const updateGuide = (id, guide, callback) => { const sql = "UPDATE guides SET name=?, destination_id=?, role=?, expertise=?, bio=?, languages=?, specialties=?, contact=?, profile_image=? WHERE id=?"; db.query(sql, [guide.name, guide.destination_id, guide.role, guide.expertise, guide.bio, guide.languages, guide.specialties, guide.contact, guide.profile_image, id], callback); }; const deleteGuide = (id, callback) => { const sql = "DELETE FROM guides WHERE id = ?"; db.query(sql, [id], callback); };

module.exports = {
    getAllGuides,
    getGuidesByDestination,
    createGuide,
    updateGuide,
    deleteGuide
};