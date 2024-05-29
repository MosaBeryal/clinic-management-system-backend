
const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const { validateAddConsultation } = require('../middleware/validateAddConsultation');

router.get('/:patientId', medicationController.getMedications);
router.post('/:patientId', medicationController.addMedication);
router.patch('/:id', medicationController.updateMedication);
router.delete('/:id', medicationController.deleteMedication);

module.exports = router;
