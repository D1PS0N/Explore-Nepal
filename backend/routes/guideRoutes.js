const express = require("express");
const router = express.Router();

const guideController = require("../controllers/guideController");

router.get("/", guideController.getAllGuides);

router.get(
    "/destination/:destinationId",
    guideController.getGuidesByDestination
);

router.post("/", guideController.createGuide);
router.put("/:id", guideController.updateGuide);
router.delete("/:id", guideController.deleteGuide);
module.exports = router;
