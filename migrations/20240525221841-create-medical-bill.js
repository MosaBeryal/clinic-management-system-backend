'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedicalBills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      positionName: {
        type: Sequelize.STRING
      },
      patientId: {
        type: Sequelize.INTEGER
      },
      subtotal: {
        type: Sequelize.DECIMAL
      },
      discount: {
        type: Sequelize.DECIMAL
      },
      insuranceAdjustment: {
        type: Sequelize.DECIMAL
      },
      totalAmountDue: {
        type: Sequelize.DECIMAL
      },
      paymentInfo: {
        type: Sequelize.TEXT
      },
      paymentMethod: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('MedicalBills');
  }
};