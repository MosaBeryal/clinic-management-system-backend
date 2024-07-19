const express = require("express");
const router = express.Router();
const consultationTemplateController = require("../controllers/consultationTemplates");
const authenticate = require("../middleware/auth");

router.get("/", consultationTemplateController.getAllConsultationTemplates);
router.get("/:id", consultationTemplateController.getTemplateById);
router.post("/", consultationTemplateController.createTemplate);
router.delete(
  "/:id",
  consultationTemplateController.deleteConsultationTemplate
);
router.patch("/:id", consultationTemplateController.updateConsultationTemplate);

module.exports = router;
