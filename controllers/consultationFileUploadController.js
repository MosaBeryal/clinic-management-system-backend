const {
  ConsultationFiles,
  Consultation,
  AssignedConsultationTemplate,
} = require("../models");
const path = require("path");
const fs = require("fs");

exports.uploadFile = async (req, res) => {
  const { consultationType } = req.query;
  const { consultationId, assignedConsultationTemplateId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    let newFile;

    if (consultationType === "default") {
      const consultation = await Consultation.findByPk(consultationId);
      if (!consultation) {
        // Remove uploaded file if consultation doesn't exist
        fs.unlinkSync(path.join(__dirname, "..", "uploads", req.file.filename));
        return res.status(404).json({ message: "Consultation not found" });
      }

      newFile = await ConsultationFiles.create({
        fileName: req.file.filename,
        consultationId,
      });
    } else if (consultationType === "template") {
      const template = await AssignedConsultationTemplate.findByPk(
        assignedConsultationTemplateId
      );
      if (!template) {
        // Remove uploaded file if template doesn't exist
        fs.unlinkSync(path.join(__dirname, "..", "uploads", req.file.filename));
        return res.status(404).json({ message: "Template not found" });
      }

      newFile = await ConsultationFiles.create({
        fileName: req.file.filename,
        assignedConsultationTemplateId,
      });
    } else {
      // Remove uploaded file if consultationType is invalid
      fs.unlinkSync(path.join(__dirname, "..", "uploads", req.file.filename));
      return res.status(400).json({ message: "Invalid consultation type" });
    }

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};

exports.getFiles = async (req, res) => {
  const { consultationType, id } = req.query;

  try {
    let files;

    if (consultationType === "default") {
      files = await ConsultationFiles.findAll({
        where: { consultationId: id },
      });
    } else if (consultationType === "template") {
      files = await ConsultationFiles.findAll({
        where: { assignedConsultationTemplateId: id },
      });
    } else {
      return res.status(400).json({ message: "Invalid consultation type" });
    }

    if (files.length === 0) {
      return res.status(404).json({ message: "No files found" });
    }

    res.status(200).json({ files });
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).json({ message: "Failed to retrieve files" });
  }
};
