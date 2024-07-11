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

        // Create the section
        const createdSection = await AssignedSection.create({
          sectionTitle,
          AssignedConsultationTemplateId: createdTemplate.id,
        });

        // Create associated fields for the section
        if (sectionFields && sectionFields.length > 0) {
          for (const field of sectionFields) {
            await AssignedField.create({
              title: field.title,
              description: field.description,
              AssignedSectionId: createdSection.id, // Assuming id is the auto-generated primary key
            });
          }
        }
      }
    }

    // Step 3: Associate with the patient
    const { patientId } = req.params;

    const patient = await Patient.findByPk(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    await createdTemplate.setPatient(patient);

    // Respond with success
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
