const { where } = require("sequelize");
const { Patient } = require("../models");
const { Op } = require("sequelize");

exports.getAllPatients = async (req, res) => {
    try {
        const searchTerm = req.query.search;

        let patients;

        console.log(searchTerm)

        if (searchTerm) {
            patients = await Patient.findAll({
                where: {
                    patientName: {
                        [Op.like]: `%${searchTerm}%`
                    }
                }
            });
        } else {
            patients = await Patient.findAll();
        }

        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getPatient = async (req, res) => {
    try {

        const { patientId } = req.params;

        if (!patientId) {
            return res
                .status(400)
                .json({ message: "Patient ID is required in params" });
        }

        const patient = await Patient.findByPk(patientId);
        // If no patient is found, return a 404 status
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // If a patient is found, return it with a 200 status
        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Controller for adding a new patient
exports.addPatient = async (req, res) => {
    try {

        const {
            patientId,
            patientName,
            gender,
            birthday,
            issuancePolicyNumber,
            address,
            phoneNumber,
            email,
        } = req.body;

        //find if there is existing user 
        const existingPatient = await Patient.findOne({
            where: { patientId: patientId }
        });

        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        const firstName = patientName.split(" ")[0]
        
        const lastName = patientName.split(" ")[1]

        const newPatient = await Patient.create({
            patientId,
            patientName,
            gender,
            birthday,
            issuancePolicyNumber,
            address,
            phoneNumber,
            email,
            firstName,
            lastName
        });
        res
            .status(201)
            .json({ message: "Patient added successfully", patient: newPatient });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

// Controller for deleting a patient by patientId
exports.deletePatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        const { user } = req.user;

        if (user.role !== "admin") {
          return res.status(403).json({
            status: 0,
            message:
              "Access denied! This operation can only be performed by an admin.",
          });
        }
        

        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const patient = await Patient.findOne({
            where: {
                patientId: patientId,
            },
        });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        await patient.destroy();
        res.status(200).json({ message: "Patient deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};
