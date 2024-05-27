const express = require('express');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 8080;

const authRoutes = require("./routes/authRoutes")
const patientRoutes = require("./routes/patientRoutes")
const consultationRoutes = require("./routes/consultationRoutes")
const medicationRoutes = require("./routes/medicationRoutes")
const imagingExamRoutes = require("./routes/imagingExamRoutes");
const medicalBillingRoutes = require("./routes/medicalBillingRoutes");
const authenticateToken = require('./middleware/auth');

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Add your routes here
app.use('/api/auth/', authRoutes);
app.use('/api/patient/', patientRoutes);
app.use('/api/consultation/', consultationRoutes);
app.use('/api/medication/', medicationRoutes);
app.use('/api/imaging-exam/', imagingExamRoutes)
app.use('/api/medical-billing/', medicalBillingRoutes)


app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
