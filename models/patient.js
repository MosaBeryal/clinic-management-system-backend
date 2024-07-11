"use strict";
const { Model } = require("sequelize");
const { calculateAge } = require("../utils/utils");
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Consultation, { foreignKey: "patientId" });
      this.hasMany(models.MedicalBill, { foreignKey: "patientId" });
      this.hasMany(models.Medication, { foreignKey: "patientId" });
      this.hasMany(models.MedicalImagingExam, { foreignKey: "patientId" });
      this.hasMany(models.ConsultationTemplate, { foreignKey: "patientId" });
    }
  }
  Patient.init(
    {
      patientId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      patientName: DataTypes.STRING,
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      age: DataTypes.INTEGER,
      birthday: DataTypes.DATE,
      issuancePolicyNumber: DataTypes.STRING,
      address: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      createdBy: DataTypes.TEXT,
      updatedBy: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Patient",
      hooks: {
        beforeSave: (patient) => {
          patient.age = calculateAge(patient.birthday);
        },
      },
      // Include createdAt and updatedAt fields
      timestamps: true,
      // Specify the name of the createdAt column
      createdAt: "createdAt",
      // Specify the name of the updatedAt column
      updatedAt: "updatedAt",
    }
  );
  return Patient;
};
