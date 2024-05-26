'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Consultations', {
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
      reasonForConsultation: {
        type: Sequelize.TEXT
      },
      medicationReview: {
        type: Sequelize.TEXT
      },
      socialHistory: {
        type: Sequelize.TEXT
      },
      reviewOfSystems: {
        type: Sequelize.TEXT
      },
      physicalExaminationFindings: {
        type: Sequelize.TEXT
      },
      assessmentAndPlan: {
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
    await queryInterface.dropTable('Consultations');
  }
};