const db = require("../config/db");

const getAllInquiries = (callback) => {
    const sql = "SELECT * FROM production_inquiries ORDER BY created_at DESC";
    db.query(sql, callback);
};

const getInquiryById = (id, callback) => {
    const sql = "SELECT * FROM production_inquiries WHERE id = ?";
    db.query(sql, [id], callback);
};

const createInquiry = (inquiry, callback) => {
    const sql = `
        INSERT INTO production_inquiries
        (package, name, email, destination, travel_date, brief)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            inquiry.package,
            inquiry.name,
            inquiry.email,
            inquiry.destination,
            inquiry.travel_date || null,
            inquiry.brief || ""
        ],
        callback
    );
};

const updateInquiryStatus = (id, status, callback) => {
    const sql = "UPDATE production_inquiries SET status = ? WHERE id = ?";
    db.query(sql, [status, id], callback);
};

const deleteInquiry = (id, callback) => {
    const sql = "DELETE FROM production_inquiries WHERE id = ?";
    db.query(sql, [id], callback);
};

module.exports = {
    getAllInquiries,
    getInquiryById,
    createInquiry,
    updateInquiryStatus,
    deleteInquiry
};
