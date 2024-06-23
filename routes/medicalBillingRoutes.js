const express = require('express');
const router = express.Router();
const medicalBillingController = require('../controllers/medicalbillingController');
const authenticate = require("../middleware/auth")

router.get('/patient/:patientId', medicalBillingController.getBillsByPatientId);
router.get('/:id', medicalBillingController.getBillsById);
router.post('/:patientId', medicalBillingController.addBill);
router.patch('/:id', medicalBillingController.updateBill);
router.delete('/:id',authenticate, medicalBillingController.deleteBill);

module.exports = router;
