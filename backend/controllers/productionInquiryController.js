const productionInquiryModel = require("../models/productionInquiryModel");

const getInquiries = (req, res) => {
    productionInquiryModel.getAllInquiries((err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error fetching production inquiries"
            });
        }
        res.status(200).json(results);
    });
};

const getInquiry = (req, res) => {
    const { id } = req.params;
    productionInquiryModel.getInquiryById(id, (err, results) => {
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
    const { package: pkg, name, email, destination, travel_date, brief } = req.body;

    if (!name || !email || !destination) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and destination are required"
        });
    }

    const inquiry = {
        package: pkg || "Custom Production",
        name,
        email,
        destination,
        travel_date: travel_date || null,
        brief: brief || ""
    };

    productionInquiryModel.createInquiry(inquiry, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error saving production inquiry"
            });
        }

        res.status(201).json({
            success: true,
            message: "Production inquiry submitted successfully",
            id: result.insertId
        });
    });
};

const updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["new", "contacted", "closed"].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Status must be new, contacted, or closed"
        });
    }

    productionInquiryModel.updateInquiryStatus(id, status, (err, result) => {
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

    productionInquiryModel.deleteInquiry(id, (err, result) => {
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
