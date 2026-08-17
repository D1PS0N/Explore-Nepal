const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { 
  createUser, 
  findUserByEmail,
  getUserById,
  updateUserProfile,
  updatePassword,
  getAllUsers: getAllUsersModel,
  updateUserByAdmin: updateUserByAdminModel,
  deleteUserByAdmin: deleteUserByAdminModel
} = require("../models/userModel");

// REGISTER USER
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(fullName, email, hashedPassword, (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to register user",
        });
      }

      res.status(201).json({
        success: true,
        message: "User registered successfully!",
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



// LOGIN USER
const loginUser = (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all fields",
    });
  }


  findUserByEmail(email, async (err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }


    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    const user = results[0];


    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }


   const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role,
  },

      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );


    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
user: {
  id: user.id,
  fullName: user.full_name,
  email: user.email,
  role: user.role,
},
    });

  });
};



// GET USER PROFILE
const getProfile = (req, res) => {

  const userId = req.user.id;


  getUserById(userId, (err, results) => {

    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }


    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      user: results[0],
    });

  });

};



// UPDATE USER PROFILE
const updateProfile = (req, res) => {

  const userId = req.user.id;

  const { fullName, phone, address } = req.body;


  if (!fullName && !phone && !address) {
    return res.status(400).json({
      success: false,
      message: "No data provided to update",
    });
  }


  updateUserProfile(
    userId,
    fullName,
    phone,
    address,
    (err, result) => {

      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to update profile",
        });
      }


      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });

    }
  );

};



// FORGOT PASSWORD
const forgotPassword = (req, res) => {

  const { email } = req.body;


  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }


  findUserByEmail(email, (err, results) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }


    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      message: "Password reset request accepted",
    });

  });

};



// RESET PASSWORD
const resetPassword = async (req, res) => {

  const { email, newPassword } = req.body;


  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and new password are required",
    });
  }


  try {

    const hashedPassword = await bcrypt.hash(newPassword, 10);


    updatePassword(
      email,
      hashedPassword,
      (err, result) => {

        if (err) {
          console.error(err);

          return res.status(500).json({
            success: false,
            message: "Failed to update password",
          });
        }


        res.status(200).json({
          success: true,
          message: "Password updated successfully",
        });

      }
    );


  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error",
    });

  }

};

// US13 - GET ALL USERS / SEARCH USERS
const getUsers = (req, res) => {
  const search = req.query.search || "";

  getAllUsers(search, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch users"
      });
    }

    res.status(200).json({
      success: true,
      users: results
    });
  });
};


// US13 - UPDATE USER
const updateUser = (req, res) => {
  const userId = req.params.id;

  const {
    fullName,
    email,
    phone,
    address,
    role
  } = req.body;

  if (!fullName || !email) {
    return res.status(400).json({
      success: false,
      message: "Full name and email are required"
    });
  }

  const userRole = role || "user";

  if (!["user", "admin"].includes(userRole)) {
    return res.status(400).json({
      success: false,
      message: "Invalid user role"
    });
  }

  updateUserByAdmin(
    userId,
    fullName,
    email,
    phone || null,
    address || null,
    userRole,
    (err, result) => {
      if (err) {
        console.error(err);

        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            success: false,
            message: "Email already exists"
          });
        }

        return res.status(500).json({
          success: false,
          message: "Failed to update user"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully"
      });
    }
  );
};


// US13 - DELETE USER
const deleteUser = (req, res) => {
  const userId = req.params.id;

  // Prevent an admin from deleting their own account
  if (Number(userId) === Number(req.user.id)) {
    return res.status(400).json({
      success: false,
      message: "You cannot delete your own admin account"
    });
  }

  deleteUserByAdmin(userId, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete user"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  });
};

// GET ALL USERS - ADMIN
const getAllUsers = (req, res) => {
  const search = req.query.search || "";

  getAllUsersModel(search, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }

    res.status(200).json({
      success: true,
      users: results,
    });
  });
};


// UPDATE USER - ADMIN
const updateUserByAdmin = (req, res) => {
  const userId = req.params.id;

  const {
    fullName,
    email,
    phone,
    address,
    role
  } = req.body;

  if (!fullName || !email || !role) {
    return res.status(400).json({
      success: false,
      message: "Full name, email and role are required",
    });
  }

  updateUserByAdminModel(
    userId,
    fullName,
    email,
    phone,
    address,
    role,
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to update user",
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    }
  );
};


// DELETE USER - ADMIN
const deleteUserByAdmin = (req, res) => {
  const userId = req.params.id;

  deleteUserByAdminModel(userId, (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin
};