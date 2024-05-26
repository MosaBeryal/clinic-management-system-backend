'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Medications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      medicalLicenseNumber: {
        type: Sequelize.STRING
      },
      doctorName: {
        type: Sequelize.STRING
      },
      medicationName: {
        type: Sequelize.STRING
      },
      dosageStrength: {
        type: Sequelize.STRING
      },
      routeOfAdministration: {
        type: Sequelize.STRING
      },
      frequency: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      purpose: {
        type: Sequelize.TEXT
      },
      allergies: {
        type: Sequelize.TEXT
      },
      currentMedications: {
        type: Sequelize.TEXT
      },
      medicalConditions: {
        type: Sequelize.TEXT
      },
      patientInstructions: {
        type: Sequelize.TEXT
      },
      patientId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Medications');
  }
};