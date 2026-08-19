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

module.exports = {
    addReview,
    getReviews
};