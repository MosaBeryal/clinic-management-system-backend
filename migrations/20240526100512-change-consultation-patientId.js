'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Consultations', 'patientId', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // If you want to revert the migration, you can change the column back to integer
    await queryInterface.changeColumn('Consultations', 'patientId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
