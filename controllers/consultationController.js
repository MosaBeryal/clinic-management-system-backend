const { Consultation, Patient } = require("../models");
const { Op } = require("sequelize");
const { isValidDate } = require("../utils/utils");
const { validationResult } = require("express-validator");

exports.getConsultations = async (req, res) => {
    try {
        const { patientId } = req.params;
        let { date } = req.query;

        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required." });
        }

        // Validate if date is provided and in correct format
        if (date && !isValidDate(date)) {
            return res
                .status(400)
                .json({
                    error: "Invalid date format. Date should be in YYYY-MM-DD format.",
                });
        }

        // Build query options
        const queryOptions = {
            where: { patientId },
            include: [{ model: Patient, attributes: ["patientName"] }],
        };

        if (date) {
            // Append time portion to the date
            const startDate = new Date(`${date}T00:00:00`);
            const endDate = new Date(`${date}T23:59:59`);

            queryOptions.where.consultationDate = {
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

exports.addConsultation = async (req, res) => {

    try {
        const { patientId } = req.params;

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

        console.log(physicalExaminationFindings)

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

        const updateFields = req.body;

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
        await Consultation.destroy({ where: { id: consultationId } });
        res.status(200).json({ message: "Consultation deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
