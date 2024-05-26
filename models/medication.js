'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patient, {
        foreignKey: 'patientId', // Set patientId as the foreign key in the Consultation table
        onDelete: 'CASCADE', // Add any cascade options if needed
        onUpdate: 'CASCADE'
      });

    }
  }
  Medication.init({
    medicalLicenseNumber: DataTypes.STRING,
    doctorName: DataTypes.STRING,
    medicationName: DataTypes.STRING,
    dosageStrength: DataTypes.STRING,
    routeOfAdministration: DataTypes.STRING,
    frequency: DataTypes.STRING,
    duration: DataTypes.STRING,
    purpose: DataTypes.TEXT,
    allergies: DataTypes.TEXT,
    currentMedications: DataTypes.TEXT,
    medicationDate: DataTypes.DATE,
    medicalConditions: DataTypes.TEXT,
    patientInstructions: DataTypes.TEXT,
    patientId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Medication',
    // Include createdAt and updatedAt fields
    timestamps: true,
    // Specify the name of the createdAt column
    createdAt: 'createdAt',
    // Specify the name of the updatedAt column
    updatedAt: 'updatedAt'
  });
  return Medication;
};