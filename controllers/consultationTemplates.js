const express = require("express");
const router = express.Router();
const { ConsultationTemplate, Section, Field } = require("../models");

// Route to create consultation template
exports.createTemplate = async (req, res) => {
  const { name, sections } = req.body;

  try {
    const template = await ConsultationTemplate.create({ name });

    for (const section of sections) {
      const newSection = await Section.create({
        sectionTitle: section.sectionTitle,
        ConsultationTemplateId: template.id,
      });

      for (const field of section.sectionFields) {
        await Field.create({
          title: field.title,
          description: field.description,
          SectionId: newSection.id,
        });
      }
    }

    const fullTemplate = await ConsultationTemplate.findByPk(template.id, {
      include: {
        model: Section,
        as: "sections",
        include: { model: Field, as: "sectionFields" },
      },
    });

    res.status(201).json({
      message: "Consultation template created successfully",
      data: fullTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTemplateById = async (req, res) => {
  try {
    const template = await ConsultationTemplate.findByPk(req.params.id, {
      include: {
        model: Section,
        as: "sections",
        include: { model: Field, as: "sectionFields" },
      },
    });

    if (!template) {
      return res.status(404).json({ error: "Template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
