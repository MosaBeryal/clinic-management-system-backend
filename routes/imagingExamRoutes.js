const express = require('express');
const router = express.Router();
const imagingExamController = require('../controllers/imagingExamController');

router.get('/:patientId', imagingExamController.getImagingExams);

router.post('/', imagingExamController.addImagingExam);

router.patch('/:id', imagingExamController.updateImagingExam);

router.delete('/:id', imagingExamController.deleteImagingExam);

module.exports = router;
