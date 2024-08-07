const express = require("express");
const router = express.Router();
const assignedTemplateController = require("../controllers/assignedTemplate");
const authenticate = require("../middleware/auth");

router.post("/:patientId", assignedTemplateController.addAndAssignTemplate);
router.get("/:patientId", assignedTemplateController.getAssignedTemplatesForPatient);
router.delete("/:templateId", assignedTemplateController.deleteAssignedTemplate);

module.exports = router;
