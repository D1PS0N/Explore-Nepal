const Review = require("../models/reviewModel");

const addReview = (req, res) => {
    const userId = req.user.id;
    const { destination_id, rating, review } = req.body;

    if (!destination_id || !rating) {
        return res.status(400).json({
            message: "Destination and rating are required"
        });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    Review.create(
        userId,
        destination_id,
        rating,
        review || "",
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: "Failed to submit review"
                });
            }

            res.status(201).json({
                message: "Review submitted successfully",
                reviewId: result.insertId
            });
        }
    );
};

const getReviews = (req, res) => {
    const { destinationId } = req.params;

    Review.getByDestination(destinationId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: "Failed to load reviews"
            });
        }

        res.json(results);
    });
};

const getAllReviews = (req, res) => {
    Review.getAll((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Failed to load reviews"
            });
        }
        res.status(200).json(results);
    });
};

const deleteReview = (req, res) => {
    const { id } = req.params;
    Review.deleteById(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Failed to delete review"
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    });
};

module.exports = {
    addReview,
    getReviews,
    getAllReviews,
    deleteReview
};