const Medication = require("../models").Medication;
const { validationResult } = require("express-validator");
const { isValidDate } = require("../utils/utils");

// Get medications by patient ID or date
exports.getMedications = async (req, res) => {
  const { patientId } = req.params;

  console.log(patientId);

  const { date } = req.query;
  try {
    if (date && !isValidDate(date)) {
      return res
        .status(400)
        .json({
          error: "Invalid date format. Date should be in YYYY-MM-DD format.",
        });
    }

    let medications;
    if (patientId && date) {
      medications = await Medication.findAll({
        where: { patientId, medicationDate: date },
      });
    } else if (patientId) {
      medications = await Medication.findAll({ where: { patientId } });
    }
    res.json({ medications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new medication
exports.addMedication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    medicalLicenseNumber,
    doctorName,
    medicationName,
    dosageStrength,
    routeOfAdministration,
    frequency,
    duration,
    purpose,
    allergies,
    currentMedications,
    medicationDate,
    medicalConditions,
    patientInstructions,
    patientId,
  } = req.body;

  try {
    const newMedication = await Medication.create({
      medicalLicenseNumber,
      doctorName,
      medicationName,
      dosageStrength,
      routeOfAdministration,
      frequency,
      duration,
      purpose,
      allergies,
      currentMedications,
      medicationDate,
      medicalConditions,
      patientInstructions,
      patientId,
    });

    res
      .status(201)
      .json({
        success: true,
        data: newMedication,
        message: "Medication added successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMedication = async (req, res) => {
  try {
    const medicationId = req.params.id;
    const updateFields = req.body;

    // Update the medication with the provided fields
    const [updatedRows] = await Medication.update(updateFields, {
      where: { id: medicationId },
    });

    if (updatedRows === 0) {
      // If no rows were updated, it means the medication with the provided ID was not found
      return res.status(404).json({ error: "Medication not found" });
    }

    res.status(200).json({ message: "Medication updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a medication
exports.deleteMedication = async (req, res) => {
  const { id } = req.params;
  try {
    const medication = await Medication.findByPk(id);

    if (!medication) {
      return res.status(404).json({ error: "Medication not found" });
    }
    
    await medication.destroy();
    res.json({ success: true, message: "Medication deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
