const {
  AssignedTemplate,
  AssignedSection,
  AssignedField,
  Patient,
} = require("../models");

exports.addAndAssignTemplate = async (req, res) => {
  const { name, sections } = req.body;

  try {
    const createdTemplate = await AssignedTemplate.create({ name });
    if (sections && sections.length > 0) {
      for (const section of sections) {
        const { sectionTitle, sectionFields } = section;

        const createdSection = await AssignedSection.create({
          sectionTitle,
          assignedConsultationTemplateId: createdTemplate.dataValues.id,
        });

        if (sectionFields && sectionFields.length > 0) {
          for (const field of sectionFields) {
            await AssignedField.create({
              title: field.title,
              description: field.description,
              assignedSectionId: createdSection.dataValues.id,
            });
          }
        }
      }
    }

    const { patientId } = req.params;
    const patient = await Patient.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await createdTemplate.setPatient(patient);

    return res.status(201).json({
      message: "Template created and assigned to patient",
    });
  } catch (error) {
    console.error("Error creating assigned template:", error);
    return res
      .status(500)
      .json({ message: "Failed to create assigned template" });
  }
};

exports.getAssignedTemplatesForPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const assignedTemplates = await AssignedTemplate.findAll({
      where: { patientId },
      include: [
        {
          model: AssignedSection,
          as: "sections",
          include: [
            {
              model: AssignedField,
              as: "sectionFields",
            },
          ],
        },
        {
          model: Patient,
          attributes: ["patientId", "patientName"],
        },
      ],
    });

    if (assignedTemplates.length === 0) {
      return res.status(404).json({
        message: "No assigned templates found for the specified patient.",
      });
    }

    res.status(200).json(assignedTemplates);
  } catch (error) {
    console.error("Error retrieving assigned templates:", error);
    res.status(500).json({
      message: "An error occurred while retrieving assigned templates.",
    });
  }
};
