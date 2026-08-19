const cinematicModel = require("../models/cinematicModel");

const getExpeditions = (req, res) => {
    cinematicModel.getAllExpeditions((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error fetching cinematic expeditions"
            });
        }

        res.status(200).json(results);
    });
};

const getExpedition = (req, res) => {
    const { id } = req.params;

    cinematicModel.getExpeditionById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error fetching expedition"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Expedition not found"
            });
        }

        res.status(200).json(results[0]);
    });
};

const createExpedition = (req, res) => {
    const { title, category, tagline, description, features, image, price_range, status } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            success: false,
            message: "Title and category are required"
        });
    }

    const expedition = {
        title,
        category,
        tagline: tagline || "",
        description: description || "",
        features: features || "",
        image: image || "",
        price_range: price_range || "",
        status: status || "active"
    };

    cinematicModel.createExpedition(expedition, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error creating expedition"
            });
        }

        res.status(201).json({
            success: true,
            message: "Cinematic expedition created successfully",
            id: result.insertId
        });
    });
};

const updateExpedition = (req, res) => {
    const { id } = req.params;
    const { title, category, tagline, description, features, image, price_range, status } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            success: false,
            message: "Title and category are required"
        });
    }

    const expedition = {
        title,
        category,
        tagline: tagline || "",
        description: description || "",
        features: features || "",
        image: image || "",
        price_range: price_range || "",
        status: status || "active"
    };

    cinematicModel.updateExpedition(id, expedition, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error updating expedition"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Expedition not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expedition updated successfully"
        });
    });
};

const deleteExpedition = (req, res) => {
    const { id } = req.params;

    cinematicModel.deleteExpedition(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error deleting expedition"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Expedition not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expedition deleted successfully"
        });
    });
};

module.exports = {
    getExpeditions,
    getExpedition,
    createExpedition,
    updateExpedition,
    deleteExpedition
};
