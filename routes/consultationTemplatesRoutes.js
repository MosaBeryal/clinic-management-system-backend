const express = require("express");
const router = express.Router();
const consultationTemplateController = require("../controllers/consultationTemplates");
const authenticate = require("../middleware/auth");
const consultationTemplate = require("../models/consultationTemplate");

router.get("/:id", consultationTemplateController.getTemplateById);
router.post("/", consultationTemplateController.createTemplate);

module.exports = router;
