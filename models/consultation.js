"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    static associate(models) {
      this.belongsTo(models.Patient, {
        foreignKey: "patientId", 
        onDelete: "CASCADE", 
        onUpdate: "CASCADE",
      });
      this.hasMany(models.ConsultationFiles, {
        as: "consultationFiles",
        foreignKey: "consultationId",
        onDelete: "CASCADE",
      });
    }
  }

  Consultation.init(
    {
      medicalLicenseNumber: DataTypes.STRING,
      doctorName: DataTypes.STRING,
      doctorLicenseNumber: DataTypes.STRING,
      reasonForConsultation: DataTypes.TEXT,
      medicationReview: DataTypes.TEXT,
      socialHistory: DataTypes.TEXT,
      consultationDate: DataTypes.DATE,
      reviewOfSystems: DataTypes.TEXT,
      physicalExaminationFindings: DataTypes.TEXT,
      assessmentAndPlan: DataTypes.TEXT,
      patientInstructions: DataTypes.TEXT,
      createdBy: DataTypes.TEXT,
      updatedBy: DataTypes.TEXT,
      patientId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Consultation",
    }
  );
  return Consultation;
};
