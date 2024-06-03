const { where } = require("sequelize");
const { MedicalBill, BillingDetail, Patient } = require("../models");
const { Op } = require("sequelize");
const medicalbill = require("../models/medicalbill");

exports.getBillsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { date } = req.query;

        const queryOptions = {
            where: { patientId },
            include: [
                { model: Patient, attributes: ["patientName", "patientId"] },
                {
                    model: BillingDetail,
                    attributes: ["id", "service", "procedureCode", "charge"],
                },
            ],
        };

        if (date) {
            const startDate = new Date(`${date}T00:00:00`);
            const endDate = new Date(`${date}T23:59:59`);

            queryOptions.where.createdAt = {
                [Op.between]: [startDate, endDate],
            };
        }

        const bills = await MedicalBill.findAll(queryOptions);

        return res.json({ success: true, data: bills });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};


exports.getBillsById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Medical Bill is required" });
        }


        const bills = await MedicalBill.findOne({
            where: { id },
            include: [
                {
                    model: BillingDetail,
                    where: { medicalBillId: id },
                    attributes: ["id", "service", "procedureCode", "charge"],
                },
            ]
        });

        if (!bills) {
            return res.status(404).json({ error: "Medical Bill not found" });
        }

        return res.json({ success: true, data: bills });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
};

exports.addBill = async (req, res) => {
    try {
        const { patientId } = req.params;

        if (!patientId) {
            return res.status(400).json({
                message: "Patient ID is required",
            });
        }

        const patient = Patient.findOne({
            where: {
                patientId,
            },
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found",
            });
        }

        let {
            positionName,
            subtotal,
            discount,
            insuranceAdjustment,
            billingDate,
            staffPosition,
            staffName,
            totalAmountDue,
            paymentDate,
            paymentMethod,
            billingDetails,
        } = req.body;

        if (!insuranceAdjustment) {
            insuranceAdjustment = 0;
        }

        if (!totalAmountDue) {
            totalAmountDue = 0;
        }

        if (!discount) {
            discount = 0;
        }


        const newBill = await MedicalBill.create({
            positionName,
            patientId,
            subtotal,
            discount,
            staffPosition,
            staffName,
            insuranceAdjustment,
            billingDate,
            totalAmountDue,
            paymentDate,
            paymentMethod,
        });

        if (billingDetails && billingDetails.length > 0) {
            for (let detail of billingDetails) {
                await BillingDetail.create({
                    ...detail,
                    medicalBillId: newBill.id,
                });
            }
        }

        const createdBill = await MedicalBill.findOne({
            where: { id: newBill.id },
            include: [
                { model: Patient, attributes: ["patientName", "patientId"] },
                {
                    model: BillingDetail,
                    attributes: ["service", "procedureCode", "charge"],
                },
            ],
        });

        res.status(201).json({
            success: true,
            data: createdBill,
            message: "Medical bill added successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateBill = async (req, res) => {
    try {
        const { id } = req.params;

        const updateFields = req.body;

        await MedicalBill.update(updateFields, { where: { id } });

        if (updateFields.billingDetails) {
            for (let detail of updateFields.billingDetails) {
                await BillingDetail.update(detail, {
                    where: { id: detail.id, medicalBillId: id, procedureCode: detail.procedureCode },
                });
            }
        }

        const updatedBill = await MedicalBill.findOne({
            where: { id },
            include: [
                { model: Patient, attributes: ["patientName", "patientId"] },
                {
                    model: BillingDetail,
                    attributes: ["service", "procedureCode", "charge"],
                },
            ],
        });

        res
            .status(200)
            .json({
                message: "Medical bill updated successfully",
                data: updatedBill,
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteBill = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res
                .status(400)
                .json({ message: "Medical Bill ID is required in params" });
        }

        const medicalBill = await MedicalBill.findOne({
            where: {
                id: id,
            },
        });

        if (!medicalBill) {
            return res.status(404).json({ message: "Medical Bill not found" });
        }

        await BillingDetail.destroy({ where: { medicalBillId: id } });

        await MedicalBill.destroy({ where: { id } });

        res.status(200).json({ message: "Medical bill deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
