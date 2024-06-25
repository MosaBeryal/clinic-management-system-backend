const express = require("express");

const router = express.Router();

const medicineController = require("../controllers/medicineController");

const authenticate = require("../middleware/auth");

router.get("/", authenticate, medicineController.getAllMedicine);

module.exports = router;
