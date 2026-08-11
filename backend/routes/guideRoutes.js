const express = require("express");
const router = express.Router();

const guideController = require("../controllers/guideController");

router.get("/", guideController.getAllGuides);

router.get(
    "/destination/:destinationId",
    guideController.getGuidesByDestination
);

module.exports = router;