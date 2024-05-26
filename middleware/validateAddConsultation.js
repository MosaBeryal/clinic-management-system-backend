const { check } = require('express-validator');

exports.validateAddConsultation = [
    check('patientId').exists().withMessage('Patient ID is required'),
    check('doctorLicenseNumber').exists().withMessage('Doctor License Number is required'),
    check('doctorName').exists().withMessage('Doctor Name is required'),
    check('reasonForConsultation').exists().withMessage('Reason for Consultation is required'),
    check('medicationReview').exists().withMessage('Medication Review is required'),
    check('socialHistory').exists().withMessage('Social History is required'),
    check('reviewOfSystems').exists().withMessage('Review of Systems is required'),
    check('physicalExamFindings').exists().withMessage('Physical Exam Findings is required'),
    check('assessmentAndPlan').exists().withMessage('Assessment and Plan is required'),
    check('patientInstructions').exists().withMessage('Patient Instructions is required'),
    check('consultationDate').exists().withMessage('Consultation Date is required'),
];