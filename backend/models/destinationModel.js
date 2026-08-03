const db = require("../config/db");

const getAllDestinations = (callback) => {
    const sql = "SELECT * FROM destinations";

    db.query(sql, callback);
};

module.exports = {
    getAllDestinations
};