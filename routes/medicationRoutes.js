const express = require("express");
const router = express.Router();
const medicationController = require("../controllers/medicationController");
const authenticate = require("../middleware/auth");

router.get(
  "/patient/:patientId",
  authenticate,
  medicationController.getMedications
);
router.get("/:id", authenticate, medicationController.getMedicationsById);
router.post("/:patientId", authenticate, medicationController.addMedication);
router.patch("/:id", authenticate, medicationController.updateMedication);
router.delete("/:id", authenticate, medicationController.deleteMedication);

module.exports = router;
