const favoriteModel = require("../models/favoriteModel");

// Add a destination to favorites
const addFavorite = (req, res) => {
    const userId = req.user.id;
    const { destination_id } = req.body;

    if (!destination_id) {
        return res.status(400).json({
            success: false,
            message: "Destination ID is required"
        });
    }

    favoriteModel.addFavorite(userId, destination_id, (err, result) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    success: false,
                    message: "Destination is already in favorites"
                });
            }

            if (err.code === "ER_NO_REFERENCED_ROW_2") {
                return res.status(404).json({
                    success: false,
                    message: "Destination not found"
                });
            }

            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Error adding favorite"
            });
        }

        res.status(201).json({
            success: true,
            message: "Destination added to favorites",
            favoriteId: result.insertId
        });
    });
};


// Get user's favorite destinations
const getFavorites = (req, res) => {
    const userId = req.user.id;

    favoriteModel.getFavoritesByUser(userId, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Error fetching favorites"
            });
        }

        res.status(200).json({
            success: true,
            favorites: results
        });
    });
};


// Remove a destination from favorites
const removeFavorite = (req, res) => {
    const userId = req.user.id;
    const { destinationId } = req.params;

    favoriteModel.removeFavorite(userId, destinationId, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                success: false,
                message: "Error removing favorite"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Favorite not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Destination removed from favorites"
        });
    });
};


module.exports = {
    addFavorite,
    getFavorites,
    removeFavorite
};