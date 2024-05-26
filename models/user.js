'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: Sequelize.ENUM('admin'),
      allowNull: false,
      defaultValue: 'admin'
    }

  }, {
    sequelize,
    modelName: 'User',
    // Include createdAt and updatedAt fields
    timestamps: true,
    // Specify the name of the createdAt column
    createdAt: 'createdAt',
    // Specify the name of the updatedAt column
    updatedAt: 'updatedAt'
  });
  return User;
};