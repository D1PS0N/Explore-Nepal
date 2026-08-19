const express = require("express");
const router = express.Router();

const productionInquiryController = require("../controllers/productionInquiryController");
const authenticateUser = require("../middleware/authMiddleware");

router.get("/", productionInquiryController.getInquiries);

router.get("/:id", productionInquiryController.getInquiry);

router.post("/", productionInquiryController.createInquiry);

router.put("/:id/status", authenticateUser, productionInquiryController.updateStatus);

router.delete("/:id", authenticateUser, productionInquiryController.deleteInquiry);

module.exports = router;
