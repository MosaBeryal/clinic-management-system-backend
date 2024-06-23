const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");
const authenticate = require("../middleware/auth");

router.get("/patient/:patientId", medicationController.getMedications);
router.get("/:id", medicationController.getMedicationsById);
router.post("/:patientId", medicationController.addMedication);
router.patch("/:id", medicationController.updateMedication);
router.delete("/:id", authenticate, medicationController.deleteMedication);

module.exports = router;
