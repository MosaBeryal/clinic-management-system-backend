
const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultationController');
const { validateAddConsultation } = require('../middleware/validateAddConsultation');
const authenticateToken = require('../middleware/auth');

router.get('/:patientId', consultationController.getConsultations);
router.post('/:patientId', consultationController.addConsultation);
router.patch('/:id', consultationController.updateConsultation);
router.delete('/:id', consultationController.deleteConsultation);

module.exports = router;
