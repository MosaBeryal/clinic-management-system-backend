const express = require("express");
const router = express.Router();
const medicalBillingController = require("../controllers/medicalbillingController");
const authenticate = require("../middleware/auth");

router.get("/patient/:patientId", authenticate,medicalBillingController.getBillsByPatientId);
router.get("/:id", authenticate,medicalBillingController.getBillsById);
router.post("/:patientId",authenticate, medicalBillingController.addBill);
router.patch("/:id",authenticate, medicalBillingController.updateBill);
router.delete("/:id", authenticate, medicalBillingController.deleteBill);

module.exports = router;
