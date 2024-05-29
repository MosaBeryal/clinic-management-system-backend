const express = require('express');
const router = express.Router();
const medicalBillingController = require('../controllers/medicalbillingController');

router.get('/:patientId', medicalBillingController.getBillsByPatientId);
router.post('/:patientId', medicalBillingController.addBill);
router.patch('/:id', medicalBillingController.updateBill);
router.delete('/:id', medicalBillingController.deleteBill);

module.exports = router;
