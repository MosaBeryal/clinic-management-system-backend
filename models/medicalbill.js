'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalBill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.BillingDetail, { foreignKey: 'medicalBillId' })
    }
  }
  MedicalBill.init({
    positionName: DataTypes.STRING,
    patientId: DataTypes.INTEGER,
    subtotal: DataTypes.DECIMAL,
    discount: DataTypes.DECIMAL,
    insuranceAdjustment: DataTypes.DECIMAL,
    billingDate: DataTypes.DATE,
    totalAmountDue: DataTypes.DECIMAL,
    paymentInfo: DataTypes.TEXT,
    paymentMethod: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MedicalBill',
  });
  return MedicalBill;
};