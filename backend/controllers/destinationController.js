const destinationModel = require("../models/destinationModel");

const getDestinations = (req, res) => {
    destinationModel.getAllDestinations((err, results) => {
        if (err) {
            return res.status(500).json({
                message: "Error fetching destinations"
            });
        }

        res.json(results);
    });
};

module.exports = {
    getDestinations
};