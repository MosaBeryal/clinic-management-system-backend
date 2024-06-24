require('dotenv').config()
const express = require('express');
const { sequelize } = require('./models');
const path = require("path")
var cors = require('cors')

console.log(process.env.NODE_ENV)


const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes")
const patientRoutes = require("./routes/patientRoutes")
const consultationRoutes = require("./routes/consultationRoutes")
const medicationRoutes = require("./routes/medicationRoutes")
const imagingExamRoutes = require("./routes/imagingExamRoutes");
const medicalBillingRoutes = require("./routes/medicalBillingRoutes");
const medicineRoutes = require("./routes/medicineRoutes")
const authenticateToken = require('./middleware/auth');

app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/auth/', authRoutes);
app.use('/api/patient/', patientRoutes);
app.use('/api/consultation/', consultationRoutes);
app.use('/api/medication/', medicationRoutes);
app.use('/api/imaging-exam/', imagingExamRoutes)
app.use('/api/medical-billing/', medicalBillingRoutes)
app.use('/api/medicine/', medicineRoutes)

// Serve index.html file when someone accesses the main route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  

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