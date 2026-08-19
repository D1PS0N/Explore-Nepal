const contactInquiryModel = require("../models/contactInquiryModel");

const getInquiries = (req, res) => {
    contactInquiryModel.getAllInquiries((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error fetching contact inquiries"
            });
        }
        res.status(200).json(results);
    });
};

const getInquiry = (req, res) => {
    const { id } = req.params;
    contactInquiryModel.getInquiryById(id, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error fetching inquiry"
            });
        }
        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }
        res.status(200).json(results[0]);
    });
};

const createInquiry = (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and message are required"
        });
    }

    const inquiry = {
        name,
        email,
        subject: subject || null,
        message
    };

    contactInquiryModel.createInquiry(inquiry, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error saving contact inquiry"
            });
        }

        res.status(201).json({
            success: true,
            message: "Your message has been sent successfully!",
            id: result.insertId
        });
    });
};

const updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["new", "read", "replied", "closed"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be new, read, replied, or closed"
        });
    }

    contactInquiryModel.updateInquiryStatus(id, status, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error updating inquiry status"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inquiry status updated"
        });
    });
};

const deleteInquiry = (req, res) => {
    const { id } = req.params;

    contactInquiryModel.deleteInquiry(id, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error deleting inquiry"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Inquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Inquiry deleted successfully"
        });
    });
};

module.exports = {
    getInquiries,
    getInquiry,
    createInquiry,
    updateStatus,
    deleteInquiry
};
