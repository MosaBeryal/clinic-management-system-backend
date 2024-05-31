const express = require('express');
const router = express.Router();
const imagingExamController = require('../controllers/imagingExamController');

router.get('/patient/:patientId', imagingExamController.getImagingExams);


router.get('/:id', imagingExamController.getImagingExamsById);

router.post('/:patientId', imagingExamController.addImagingExam);

router.patch('/:id', imagingExamController.updateImagingExam);

router.delete('/:id', imagingExamController.deleteImagingExam);

module.exports = router;
