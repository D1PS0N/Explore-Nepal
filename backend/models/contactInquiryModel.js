const db = require("../config/db");

const getAllInquiries = (callback) => {
    const sql = "SELECT * FROM contact_inquiries ORDER BY created_at DESC";
    db.query(sql, callback);
};

const getInquiryById = (id, callback) => {
    const sql = "SELECT * FROM contact_inquiries WHERE id = ?";
    db.query(sql, [id], callback);
};

const createInquiry = (inquiry, callback) => {
    const sql = `
        INSERT INTO contact_inquiries
        (name, email, subject, message)
        VALUES (?, ?, ?, ?)
    `;
    db.query(
        sql,
        [inquiry.name, inquiry.email, inquiry.subject || null, inquiry.message],
        callback
    );
};

const updateInquiryStatus = (id, status, callback) => {
    const sql = "UPDATE contact_inquiries SET status = ? WHERE id = ?";
    db.query(sql, [status, id], callback);
};

const deleteInquiry = (id, callback) => {
    const sql = "DELETE FROM contact_inquiries WHERE id = ?";
    db.query(sql, [id], callback);
};

module.exports = {
    getAllInquiries,
    getInquiryById,
    createInquiry,
    updateInquiryStatus,
    deleteInquiry
};
