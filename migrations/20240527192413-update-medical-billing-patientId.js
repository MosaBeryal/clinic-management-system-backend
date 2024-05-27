'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('MedicalBills', 'patientId', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('MedicalBills', 'patientId', {
      type: Sequelize.INTEGER, // Change this back to the original type if needed
      allowNull: true, // Modify this if patientId was originally required
    });
  }
};
