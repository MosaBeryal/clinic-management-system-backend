'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'id' column
    await queryInterface.removeColumn('Patients', 'id');

    // Modify 'patientId' to be the primary key
    await queryInterface.changeColumn('Patients', 'patientId', {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the 'id' column
    await queryInterface.addColumn('Patients', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    });

    // Modify 'patientId' back to its original state
    await queryInterface.changeColumn('Patients', 'patientId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  }
};
