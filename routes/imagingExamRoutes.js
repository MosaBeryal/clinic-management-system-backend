const express = require("express");
const router = express.Router();
const imagingExamController = require("../controllers/imagingExamController");
const authenticate = require("../middleware/auth");

router.get(
  "/patient/:patientId",
  authenticate,
  imagingExamController.getImagingExams
);

router.get("/:id", authenticate, imagingExamController.getImagingExamsById);

router.post("/:patientId", authenticate, imagingExamController.addImagingExam);

router.patch("/:id", authenticate, imagingExamController.updateImagingExam);

router.delete("/:id", authenticate, imagingExamController.deleteImagingExam);

module.exports = router;
