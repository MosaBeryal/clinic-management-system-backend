const express = require('express');
const router = express.Router();
const medicalBillingController = require('../controllers/medicalBillingController');

router.get('/:patientId', medicalBillingController.getBillsByPatientId);
router.post('/', medicalBillingController.addBill);
router.patch('/:id', medicalBillingController.updateBill);
router.delete('/:id', medicalBillingController.deleteBill);

module.exports = router;
