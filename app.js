require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const path = require("path");
var cors = require("cors");

console.log(process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const imagingExamRoutes = require("./routes/imagingExamRoutes");
const medicalBillingRoutes = require("./routes/medicalBillingRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const consultationTemplateRoutes = require("./routes/consultationTemplatesRoutes");
const assignTemplateRoutes = require("./routes/assignedTemplateRoutes");
const consultationFileUploadRoutes = require("./routes/consultationFiles");
const authenticateToken = require("./middleware/auth");

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth/", authRoutes);
app.use("/api/patient/", patientRoutes);
app.use("/api/consultation/", consultationRoutes);
app.use("/api/medication/", medicationRoutes);
app.use("/api/imaging-exam/", imagingExamRoutes);
app.use("/api/medical-billing/", medicalBillingRoutes);
app.use("/api/consultation-template/", consultationTemplateRoutes);
app.use("/api/templates/", assignTemplateRoutes);
app.use("/api/consultation-files/", consultationFileUploadRoutes);
app.use("/api/medicine/", medicineRoutes);

// Serve index.html file when someone accesses the main route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/api/files", express.static(path.join(__dirname, "public/uploads")));

app.get("/api/file/:filename", (req, res) => {
  // Decode the filename to handle spaces and special characters
  const filename = decodeURIComponent(req.params.filename);
  const filePath = path.join(__dirname, "public/uploads", filename);

  console.log(`Downloading file: ${filePath}`);

  // Set headers to trigger download
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error(err);
      if (err.code === "ENOENT") {
        res.status(404).send("File not found");
      } else {
        res.status(500).send("Internal Server Error");
      }
    }
  });
});

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database & tables synchronized!");
  })
  .catch((error) => {
    console.error("Unable to sync the database:", error);
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
