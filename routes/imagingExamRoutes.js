const express = require('express');
const router = express.Router();
const imagingExamController = require('../controllers/imagingExamController');
const authenticate = require("../middleware/auth")

router.get('/patient/:patientId', imagingExamController.getImagingExams);


router.get('/:id', imagingExamController.getImagingExamsById);

router.post('/:patientId', imagingExamController.addImagingExam);

router.patch('/:id', imagingExamController.updateImagingExam);

router.delete('/:id',authenticate, imagingExamController.deleteImagingExam);

module.exports = router;
