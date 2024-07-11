const express = require("express");
const router = express.Router();
const { ConsultationTemplate, Section, Field } = require("../models");

// Route to create consultation template
exports.getAllConsultationTemplates = async (req, res) => {
  try {
    const templates = await ConsultationTemplate.findAll({
      include: {
        model: Section,
        as: "sections",
        include: { model: Field, as: "sectionFields" },
      },
    });

    res.status(200).json(templates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

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
    res.status(500).json({ message: "Internal server error" });
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
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateConsultationTemplate = async (req, res) => {
  const { id } = req.params;
  const { name, sections } = req.body;

  try {
    // Find the consultation template by id
    const template = await ConsultationTemplate.findByPk(id, {
      include: {
        model: Section,
        as: "sections",
        include: { model: Field, as: "sectionFields" },
      },
    });

    if (!template) {
      return res.status(404).json({ message: "Consultation template not found" });
    }

    // Update the consultation template name
    template.name = name;
    await template.save();

    // Update or create sections and fields
    for (const sectionData of sections) {
      let section = await Section.findOne({
        where: { id: sectionData.id, ConsultationTemplateId: id },
      });

      if (!section) {
        // If section doesn't exist, create a new one
        section = await Section.create({
          sectionTitle: sectionData.sectionTitle,
          ConsultationTemplateId: id,
        });
      } else {
        // If section exists, update it
        section.sectionTitle = sectionData.sectionTitle;
        await section.save();
      }

      // Update or create fields for the section
      for (const fieldData of sectionData.sectionFields) {
        let field = await Field.findOne({
          where: { id: fieldData.id, SectionId: section.id },
        });

        if (!field) {
          // If field doesn't exist, create a new one
          field = await Field.create({
            title: fieldData.title,
            description: fieldData.description,
            SectionId: section.id,
          });
        } else {
          // If field exists, update it
          field.title = fieldData.title;
          field.description = fieldData.description;
          await field.save();
        }
      }
    }

    // Fetch the updated consultation template with sections and fields
    const updatedTemplate = await ConsultationTemplate.findByPk(id, {
      include: {
        model: Section,
        as: "sections",
        include: { model: Field, as: "sectionFields" },
      },
    });

    res.status(200).json({
      message: "Consultation template updated successfully",
      data: updatedTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
