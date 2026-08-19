const db = require("../config/db");


// Create new user
const createUser = (fullName, email, password, callback) => {
  const sql =
    "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [fullName, email, password], callback);
};


// Find user by email (used for login)
const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], callback);
};


// Get user profile by ID
const getUserById = (id, callback) => {
  const sql =
    "SELECT id, full_name, email, phone, address, created_at FROM users WHERE id = ?";

  db.query(sql, [id], callback);
};


// Update user profile
const updateUserProfile = (id, fullName, phone, address, callback) => {
  const sql =
    "UPDATE users SET full_name = ?, phone = ?, address = ? WHERE id = ?";

  db.query(sql, [fullName, phone, address, id], callback);
};


// Update user password
const updatePassword = (email, hashedPassword, callback) => {
  const sql =
    "UPDATE users SET password = ? WHERE email = ?";

  db.query(sql, [hashedPassword, email], callback);
};

// Get all users for admin
const getAllUsers = (search, callback) => {
  let sql = `
    SELECT id, full_name, email, phone, address, created_at, role
    FROM users
  `;

  const params = [];

  if (search) {
    sql += `
      WHERE full_name LIKE ?
      OR email LIKE ?
    `;

    const searchValue = `%${search}%`;
    params.push(searchValue, searchValue);
  }

  sql += " ORDER BY id ASC";

  db.query(sql, params, callback);
};


// Update user account by admin
const updateUserByAdmin = (
  id,
  fullName,
  email,
  phone,
  address,
  role,
  callback
) => {
  const sql = `
    UPDATE users
    SET full_name = ?,
        email = ?,
        phone = ?,
        address = ?,
        role = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [fullName, email, phone, address, role, id],
    callback
  );
};


// Delete user account by admin
const deleteUserByAdmin = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserById,
  updateUserProfile,
  updatePassword,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
};