
const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { validateAddConsultation } = require('../middleware/validateAddConsultation');
const authenticate = require('../middleware/auth');

router.get('/patient/:patientId', consultationController.getConsultations);
router.get('/:id', consultationController.getConsultationById);
router.post('/:patientId', consultationController.addConsultation);
router.patch('/:id', consultationController.updateConsultation);
router.delete('/:id', authenticate,consultationController.deleteConsultation);

module.exports = router;
