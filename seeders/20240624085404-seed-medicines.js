// seeders/YYYYMMDDHHMMSS-seed-medicines.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Medicines', [
      { medicineName: 'AACIDEXAM SOL.INJ. 5 MG / 1 ML', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'AACIFEMINE CPR. 2 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'AACIFEMINE CR. 1 MG / 1 G', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'AACIFEMINE OVULE 0.5 MG / 1 G', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABASAGLAR SOL.INJ. 100 UI / 1 ML', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABILIFY (ABACUS MEDICINE) CPR. 10 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABILIFY (ABACUS MEDICINE) CPR. 15 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABILIFY CPR. 10 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABILIFY CPR. 15 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABILIFY CPR. 30 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABILIFY MAINTENA PSV.SP.INJ.LIB.PROL. 400 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABIRATERONE ACCORD CPR.PELLIC. 500 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABIRATÉRONE MYLAN CPR.PELLIC. 1000 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ABIRATÉRONE MYLAN CPR.PELLIC. 500 MG', createdAt: new Date(), updatedAt: new Date() },
      { medicineName: 'ACARIZAX LYOPHIL.SUBLING. 1*30 LYOPHILISAT', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Add logic to revert data if needed
    await queryInterface.bulkDelete('Medicines', null, {});
  }
};
