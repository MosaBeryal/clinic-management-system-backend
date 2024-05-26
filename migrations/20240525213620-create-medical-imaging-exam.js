'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalImagingExams', {
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
      radiologistName: {
        type: Sequelize.STRING
      },
      examDate: {
        type: Sequelize.DATE
      },
      examType: {
        type: Sequelize.STRING
      },
      clinicalIndication: {
        type: Sequelize.TEXT
      },
      previousImagingStudies: {
        type: Sequelize.TEXT
      },
      results: {
        type: Sequelize.TEXT
      },
      abnormalities: {
        type: Sequelize.TEXT
      },
      impressions: {
        type: Sequelize.TEXT
      },
      recommendations: {
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
    await queryInterface.dropTable('MedicalImagingExams');
  }
};