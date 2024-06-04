const jwt = require("jsonwebtoken");
const User = require("../models").User;
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const user = require("../models/user");

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (user.isBlocked) {
      return res
        .status(400)
        .json({ message: "Your access to this platform has been blocked" });
    }

    const payload = {
      user,
    };

    const userWithoutPassword = user.get({ plain: true });

    delete userWithoutPassword.password;

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        res.json({ user: userWithoutPassword, message: "Logged in!", token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Signup route
exports.signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "admin", // default to 'admin' if role is not provided
    });

    // Return the created user (without password)
    const userResponse = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return res.status(201).json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.ne]: "admin",
        },
      },
      attributes: { exclude: ["password"] },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { passwordUpdate } = req.query;

    const { userId } = req.params;

    let updateFields = req.body;

    console.log(updateFields);

    if (passwordUpdate) {
      const user = await User.findByPk(userId);

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword && !newPassword) {
        return res.send(400).json({
          message: "Old password and new password are required",
        });
      }

      //compare user password with hash
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updateFields = {
          password: hashedPassword,
        };
      } else {
        return res.status(400).json({
          message: "Old password is incorrect",
        });
      }
    }

    const updatedUser = await User.update(updateFields, {
      where: { id: userId },
    });

    if (updatedUser === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `${
        passwordUpdate
          ? "Password updated successfully"
          : "User updated successfully"
      }`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
