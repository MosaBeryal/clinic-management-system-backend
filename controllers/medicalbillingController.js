
const { where } = require('sequelize');
const { MedicalBill, BillingDetail, Patient } = require('../models');

exports.getBillsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { date } = req.query;

        const queryOptions = {
            where: { patientId },
            include: [
                { model: Patient, attributes: ['patientName', 'patientId'] },
                { model: BillingDetail, attributes: ['service', 'procedureCode', 'charge'] }
            ],
        };

        if (date) {
            queryOptions.where.billingDate = date;
        }

        const bills = await MedicalBill.findAll(queryOptions);

        return res.json({ success: true, data: bills });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};



exports.addBill = async (req, res) => {
    try {
        const {
            positionName,
            patientId,
            subtotal,
            discount,
            insuranceAdjustment,
            billingDate,
            totalAmountDue,
            paymentInfo,
            paymentMethod,
            billingDetails
        } = req.body;

        const newBill = await MedicalBill.create({
            positionName,
            patientId,
            subtotal,
            discount,
            insuranceAdjustment,
            billingDate,
            totalAmountDue,
            paymentInfo,
            paymentMethod
        });

        if (billingDetails && billingDetails.length > 0) {
            for (let detail of billingDetails) {
                await BillingDetail.create({
                    ...detail,
                    medicalBillId: newBill.id
                });
            }
        }

        const createdBill = await MedicalBill.findOne({
            where: { id: newBill.id },
            include: [
                { model: Patient, attributes: ['patientName', 'patientId'] },
                { model: BillingDetail, attributes: ['service', 'procedureCode', 'charge'] }
            ]
        });

        res.status(201).json({
            success: true,
            data: createdBill,
            message: "Medical bill added successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
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
                    where: { medicalBillId: id, procedureCode: detail.procedureCode }
                });
            }
        }

        const updatedBill = await MedicalBill.findOne({
            where: { id },
            include: [
                { model: Patient, attributes: ['patientName', 'patientId'] },
                { model: BillingDetail, attributes: ['service', 'procedureCode', 'charge'] }
            ]
        });

        res.status(200).json({ message: 'Medical bill updated successfully', data: updatedBill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteBill = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Medical Bill ID is required in params" });
        }

        const medicalBill = await MedicalBill.findOne({
            where: {
                id: id
            }
        })

        if (!medicalBill) {
            return res.status(404).json({ message: "Medical Bill not found" });
        }

        await BillingDetail.destroy({ where: { medicalBillId: id } });
        
        await MedicalBill.destroy({ where: { id } });



        res.status(200).json({ message: 'Medical bill deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
