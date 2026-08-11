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

module.exports = {
    getAllGuides,
    getGuidesByDestination
};