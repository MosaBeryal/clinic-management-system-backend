const { Op } = require("sequelize");
const { MedicalImagingExam, Patient } = require("../models");

exports.getImagingExams = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { date } = req.query;

    const queryOptions = {
      where: { patientId },
      include: [{ model: Patient, attributes: ["patientName"] }],
    };

    if (date) {
      const startDate = new Date(`${date}T00:00:00`);
      const endDate = new Date(`${date}T23:59:59`);

      queryOptions.where.createdAt = {
        [Op.between]: [startDate, endDate],
      };
    }

    const exams = await MedicalImagingExam.findAll(queryOptions);
    res.status(200).json({ success: true, data: exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getImagingExamsById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Imaging Exam Id is required" });
    }

    const exams = await MedicalImagingExam.findByPk(id);

    if (!exams) {
      return res.status(404).json({ error: "Imaging Exam not found" });
    }

    res.status(200).json({ success: true, data: exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addImagingExam = async (req, res) => {
  try {
    const { patientId } = req.params;

    const { user } = req.user;

    const createdBy = user.firstName + " " + user.lastName;

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required." });
    }

    const patient = Patient.findOne({
      where: {
        patientId,
      },
    });

    if (!patient) {
      return res.status(400).json({ error: "Patient not found." });
    }

    const {
      medicalLicenseNumber,
      doctorName,
      radiologistName,
      examDate,
      examType,
      radiologistMedicalLicense,
      clinicalIndication,
      previousImagingStudies,
      results,
      imagingExamDate,
      abnormalities,
      impressions,
      recommendations,
    } = req.body;

    const newExam = await MedicalImagingExam.create({
      patientId,
      medicalLicenseNumber,
      doctorName,
      radiologistName,
      radiologistMedicalLicense,
      examDate,
      examType,
      clinicalIndication,
      previousImagingStudies,
      results,
      imagingExamDate,
      abnormalities,
      impressions,
      recommendations,
      createdBy,
    });

    res.status(201).json({
      success: true,
      data: newExam,
      message: "Imaging exam added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateImagingExam = async (req, res) => {
  try {
    const { id } = req.params;

    const { user } = req.user;

    updateFields.updatedBy = user.firstName + " " + user.lastName;

    await MedicalImagingExam.update(updateFields, { where: { id } });

    res.status(200).json({ message: "Imaging exam updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteImagingExam = async (req, res) => {
  try {
    const { id } = req.params;

    const { user } = req.user;

    if (user.role !== "admin") {
      return res.status(403).json({
        status: 0,
        message:
          "Access denied! This operation can only be performed by an admin.",
      });
    }

    await MedicalImagingExam.destroy({ where: { id } });

    res.status(200).json({ message: "Imaging exam deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
