const { Consultation, Patient, ConsultationFiles } = require("../models");
const { Op } = require("sequelize");
const { isValidDate } = require("../utils/utils");
const { validationResult } = require("express-validator");
const consultationFiles = require("../models/consultationFiles");

exports.getConsultations = async (req, res) => {
  try {
    const { patientId } = req.params;

    let { date } = req.query;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    // Validate if date is provided and in correct format
    if (date && !isValidDate(date)) {
      return res.status(400).json({
        error: "Invalid date format. Date should be in YYYY-MM-DD format.",
      });
    }

    // Build query options
    const queryOptions = {
      where: { patientId },
      include: [{ model: Patient, attributes: ["patientName"] }],
      include: [
        {
          model: ConsultationFiles,
          attributes: ["id", "fileName"],
          as: "consultationFiles",
        },
      ],
    };

    if (date) {
      // Append time portion to the date
      const startDate = new Date(`${date}T00:00:00`);
      const endDate = new Date(`${date}T23:59:59`);

      queryOptions.where.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    console.log(queryOptions);

    // Fetch consultations
    const consultations = await Consultation.findAll(queryOptions);

    return res.json({ consultations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getConsultationById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (!id) {
      return res.status(400).json({ message: "Consultation Id is required." });
    }

    const consultations = await Consultation.findByPk(id);

    if (!consultations) {
      return res.status(404).json({ message: "Consultation not found." });
    }

    return res.json({ consultations });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.addConsultation = async (req, res) => {
  try {
    const { patientId } = req.params;

    const { user } = req.user;

    const {
      doctorLicenseNumber,
      doctorName,
      reasonForConsultation,
      medicationReview,
      socialHistory,
      reviewOfSystems,
      physicalExaminationFindings,
      assessmentAndPlan,
      patientInstructions,
      consultationDate,
    } = req.body;

    const createdBy = user.firstName + " " + user.lastName;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required." });
    }

    const patient = Patient.findOne({
      where: {
        patientId,
      },
    });

    if (!patient) {
      return res.status(400).json({ error: "Patient not found." });
    }

    const newConsultation = await Consultation.create({
      patientId,
      doctorLicenseNumber,
      doctorName,
      reasonForConsultation,
      medicationReview,
      socialHistory,
      reviewOfSystems,
      physicalExaminationFindings,
      assessmentAndPlan,
      patientInstructions,
      consultationDate,
      createdBy,
    });

    res.status(201).json({
      success: true,
      data: newConsultation,
      message: "Consultation added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateConsultation = async (req, res) => {
  try {
    const consultationId = req.params.id;

    const consultation = await Consultation.findByPk(consultationId);

    if (!consultation) {
      return res.status(400).json({ message: "Consultation not found" });
    }

    const { user } = req.user;

    const updateFields = req.body;

    updateFields.updatedBy = user.firstName + " " + user.lastName;

    // Update the consultation with the provided fields
    await Consultation.update(updateFields, { where: { id: consultationId } });

    res.status(200).json({ message: "Consultation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteConsultation = async (req, res) => {
  try {
    const consultationId = req.params.id;

    const { user } = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({
        status: 0,
        message:
          "Access denied! This operation can only be performed by an admin.",
      });
    }

    await Consultation.destroy({ where: { id: consultationId } });
    res.status(200).json({ message: "Consultation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
