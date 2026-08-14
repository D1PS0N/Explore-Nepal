const express = require("express");
const router = express.Router();

const destinationController = require("../controllers/destinationController");

router.get("/", destinationController.getDestinations);

router.get("/recommendations", destinationController.getRecommendedDestinations);

router.post("/", destinationController.createDestination);

router.put("/:id", destinationController.updateDestination);

router.delete("/:id", destinationController.deleteDestination);

module.exports = router;