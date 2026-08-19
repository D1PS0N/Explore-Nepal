const express = require("express");
const router = express.Router();

const contactInquiryController = require("../controllers/contactInquiryController");
const authenticateUser = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Public: submit a contact inquiry
router.post("/", contactInquiryController.createInquiry);

// Admin only: list all
router.get("/", authenticateUser, authorizeAdmin, contactInquiryController.getInquiries);

// Admin only: get single
router.get("/:id", authenticateUser, authorizeAdmin, contactInquiryController.getInquiry);

// Admin only: update status
router.put("/:id/status", authenticateUser, authorizeAdmin, contactInquiryController.updateStatus);

// Admin only: delete
router.delete("/:id", authenticateUser, authorizeAdmin, contactInquiryController.deleteInquiry);

module.exports = router;
