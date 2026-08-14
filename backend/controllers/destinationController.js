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

module.exports = {
    getDestinations,
    createDestination,
    updateDestination,
    deleteDestination
};