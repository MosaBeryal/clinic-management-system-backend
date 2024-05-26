'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalImagingExam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patient, {
        foreignKey: 'patientId', // Set patientId as the foreign key in the MedicalImagingExam table
        onDelete: 'CASCADE', // Add any cascade options if needed
        onUpdate: 'CASCADE'
      });
    }
  }
  MedicalImagingExam.init({
    medicalLicenseNumber: DataTypes.STRING,
    doctorName: DataTypes.STRING,
    radiologistName: DataTypes.STRING,
    examDate: DataTypes.DATE,
    examType: DataTypes.STRING,
    clinicalIndication: DataTypes.TEXT,
    previousImagingStudies: DataTypes.TEXT,
    results: DataTypes.TEXT,
    imagingExamDate: DataTypes.DATE,
    abnormalities: DataTypes.TEXT,
    impressions: DataTypes.TEXT,
    recommendations: DataTypes.TEXT,
    patientId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MedicalImagingExam',
    // Include createdAt and updatedAt fields
    timestamps: true,
    // Specify the name of the createdAt column
    createdAt: 'createdAt',
    // Specify the name of the updatedAt column
    updatedAt: 'updatedAt'
  });
  return MedicalImagingExam;
};