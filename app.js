const express = require('express');
const { sequelize } = require('./models');
var cors = require('cors')


const app = express();
const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/authRoutes")
const patientRoutes = require("./routes/patientRoutes")
const consultationRoutes = require("./routes/consultationRoutes")
const medicationRoutes = require("./routes/medicationRoutes")
const imagingExamRoutes = require("./routes/imagingExamRoutes");
const medicalBillingRoutes = require("./routes/medicalBillingRoutes");
const authenticateToken = require('./middleware/auth');

app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(express.json());

app.use('/api/auth/', authRoutes);
app.use('/api/patient/', patientRoutes);
app.use('/api/consultation/', consultationRoutes);
app.use('/api/medication/', medicationRoutes);
app.use('/api/imaging-exam/', imagingExamRoutes)
app.use('/api/medical-billing/', medicalBillingRoutes)


sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables synchronized!');
    })
    .catch(error => {
        console.error('Unable to sync the database:', error);
    });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});