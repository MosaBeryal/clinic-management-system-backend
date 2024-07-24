const jwt = require("jsonwebtoken");
const User = require("../models").User;
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

exports.signIn = async (req, res) => {
  try {
    const { email, password, token } = req.body;

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

    if (user.twoFactorEnabled) {
      if (!token) {
        return res.status(200).json({
          message: "Please provide 2FA token",
          twoFactorEnabled: true,
        });
      }

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token,
        window: 1,
      });

      if (!verified) {
        return res.status(401).json({ message: "Invalid 2FA token" });
      }
    }

    const userWithoutPassword = user.get({ plain: true });

    delete userWithoutPassword.password;

    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY || "defaultSecret",
      { expiresIn: "7d" },
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

exports.twoFactorAuth = async (req, res) => {
  const id = req.body.userId;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const secret = speakeasy.generateSecret({ length: 20 });

  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: `MyApp (${user.email})`,
    issuer: "MyApp",
  });

  qrcode.toDataURL(otpauthUrl, (err, dataUrl) => {
    if (err) {
      return res.status(500).json({ message: "Error generating QR code" });
    }
    user.twoFactorSecret = secret.base32;
    user.save();
    res.json({ qrCodeUrl: dataUrl, secret: secret.base32 });
  });
};

exports.verify2fa = async (req, res) => {
  const { userId: id, token } = req.body;
  try {
    const user = await User.findByPk(id);

    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) {
      return res.status(401).json({ message: "Invalid 2FA token" });
    }

    user.twoFactorEnabled = true;
    await user.save();

    res.json({ message: "2FA enabled successfully" });
  } catch (error) {
    console.error("Error during 2FA verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { passwordUpdate } = req.query;
    const { userId } = req.params;
    let updateFields = { ...req.body };

    if (passwordUpdate) {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res.status(400).json({
          message: "Old password and new password are required",
        });
      }

      // Compare user password with hash
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (isMatch) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        updateFields.password = hashedPassword;
      } else {
        return res.status(400).json({
          message: "Old password is incorrect",
        });
      }
    }

    // Ensure isBlocked is handled
    if (updateFields.isBlocked !== undefined) {
      updateFields.status = updateFields.isBlocked ? "blocked" : "active";
    }

    const [updatedRowCount] = await User.update(updateFields, {
      where: { id: userId },
    });

    if (updatedRowCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found or no changes made" });
    }

    res.status(200).json({
      message: passwordUpdate
        ? "Password updated successfully"
        : "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    
    const { user } = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({
        status: 0,
        message:
          "Access denied! This operation can only be performed by an admin.",
      });
    }

    const { userId } = req.params;

    const deletedRowCount = await User.destroy({
      where: { id: userId },
    });

    if (deletedRowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
