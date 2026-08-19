const express = require("express");
const router = express.Router();

const cinematicController = require("../controllers/cinematicController");

router.get("/", cinematicController.getExpeditions);

router.get("/:id", cinematicController.getExpedition);

router.post("/", cinematicController.createExpedition);

router.put("/:id", cinematicController.updateExpedition);

router.delete("/:id", cinematicController.deleteExpedition);

module.exports = router;
