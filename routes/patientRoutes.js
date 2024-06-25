const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const authenticate = require("../middleware/auth");

//get patients
router.get("/", authenticate, patientController.getAllPatients);

//get patients by id
router.get("/:patientId", authenticate, patientController.getPatient);

// Route for adding a new patient
router.post("/add", authenticate, patientController.addPatient);

// Route for deleting a patient by patientId
router.delete("/:patientId", authenticate, patientController.deletePatient);

module.exports = router;
