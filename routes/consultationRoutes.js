const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultationController");
const authenticate = require("../middleware/auth");

router.get(
  "/patient/:patientId",
  authenticate,
  consultationController.getConsultations
);
router.get("/:id", authenticate, consultationController.getConsultationById);
router.post(
  "/:patientId",
  authenticate,
  consultationController.addConsultation
);
router.patch("/:id", authenticate, consultationController.updateConsultation);
router.delete("/:id", authenticate, consultationController.deleteConsultation);

module.exports = router;
