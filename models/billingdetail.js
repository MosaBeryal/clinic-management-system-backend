'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BillingDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.MedicalBill, { foreignKey: 'medicalBillId' });
      
    }
  }
  BillingDetail.init({
    service: DataTypes.STRING,
    procedureCode: DataTypes.STRING,
    charge: DataTypes.DECIMAL,
    medicalBillId: DataTypes.INTEGER
  }, {
    sequelize,
    
    modelName: 'BillingDetail',
    // Include createdAt and updatedAt fields
    timestamps: true,
    // Specify the name of the createdAt column
    createdAt: 'createdAt',
    // Specify the name of the updatedAt column
    updatedAt: 'updatedAt'
  });
  return BillingDetail;
};