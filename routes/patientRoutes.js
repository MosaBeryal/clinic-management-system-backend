const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

//get patients
router.get('/', patientController.getAllPatients);


// Route for adding a new patient
router.post('/add', patientController.addPatient);



// Route for deleting a patient by patientId
router.delete('/:patientId', patientController.deletePatient);

module.exports = router;
