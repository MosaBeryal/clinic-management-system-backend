const express = require("express");
const router = express.Router();
const assignedTemplateController= require("../controllers/assignedTemplate");
const authenticate = require("../middleware/auth");

router.post("/:patientId", assignedTemplateController.addAndAssignTemplate)

module.exports = router;
