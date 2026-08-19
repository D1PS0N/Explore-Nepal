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

const createDestination = (req, res) => {
    const { name, location, description, image, attractions } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Destination name is required"
        });
    }

    const destination = {
        name,
        location,
        description,
        image,
        attractions
    };

    destinationModel.createDestination(destination, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Error creating destination"
            });
        }

        res.status(201).json({
            message: "Destination created successfully",
            id: result.insertId
        });
    });
};

const updateDestination = (req, res) => {
    const { id } = req.params;
    const { name, location, description, image, attractions } = req.body;

    if (!name) {
        return res.status(400).json({
            message: "Destination name is required"
        });
    }

    const destination = {
        name,
        location,
        description,
        image,
        attractions
    };

    destinationModel.updateDestination(id, destination, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Error updating destination"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.json({
            message: "Destination updated successfully"
        });
    });
};

const deleteDestination = (req, res) => {
    const { id } = req.params;

    destinationModel.deleteDestination(id, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Error deleting destination"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Destination not found"
            });
        }

        res.json({
            message: "Destination deleted successfully"
        });
    });
};

const getRecommendedDestinations = (req, res) => {
    const { interests } = req.query;

    if (!interests) {
        return res.status(400).json({
            message: "Please provide at least one interest"
        });
    }

    const selectedInterests = interests
        .split(",")
        .map(interest => interest.trim())
        .filter(interest => interest.length > 0);

    if (selectedInterests.length === 0) {
        return res.status(400).json({
            message: "Please provide at least one valid interest"
        });
    }

    destinationModel.getRecommendedDestinations(
        selectedInterests,
        (err, results) => {
            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Error fetching recommended destinations"
                });
            }

            res.json(results);
        }
    );
};

module.exports = {
    getDestinations,
    createDestination,
    updateDestination,
    deleteDestination,
    getRecommendedDestinations
};
