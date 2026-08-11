const guideModel = require("../models/guideModel");

const getAllGuides = (req, res) => {
    guideModel.getAllGuides((err, guides) => {
        if (err) {
            console.error("Error fetching guides:", err);
            return res.status(500).json({
                message: "Error fetching guides"
            });
        }

        res.json(guides);
    });
};

const getGuidesByDestination = (req, res) => {
    const destinationId = req.params.destinationId;

    guideModel.getGuidesByDestination(destinationId, (err, guides) => {
        if (err) {
            console.error("Error fetching guides:", err);
            return res.status(500).json({
                message: "Error fetching guides"
            });
        }

        res.json(guides);
    });
};

module.exports = {
    getAllGuides,
    getGuidesByDestination
};