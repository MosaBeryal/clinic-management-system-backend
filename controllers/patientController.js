const { Patient } = require("../models");

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

        const newPatient = await Patient.create({
            patientId,
            patientName,
            gender,
            birthday,
            issuancePolicyNumber,
            address,
            phoneNumber,
            email,
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

        if (!patientId) {
            return res.status(400).json({ message: "Patient ID is required" });
        }

        const patient = await Patient.findOne({
            where: {
                patientId: patientId,
            },
        });
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }
        await patient.destroy();
        res.status(200).json({ msg: "Patient deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};
