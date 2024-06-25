"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Consultation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patient, {
        foreignKey: "patientId", // Set patientId as the foreign key in the Consultation table
        onDelete: "CASCADE", // Add any cascade options if needed
        onUpdate: "CASCADE",
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
