const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signin", authController.signIn);
router.post("/signup", authController.signUp);
router.post("/2fa", authController.twoFactorAuth);
router.post("/verify-2fa", authController.verify2fa);
router.get("/users", authController.getAllUser);
router.delete("/users/:userId", authController.deleteUser);
router.patch("/user-update/:userId", authController.updateUser);
module.exports = router;
