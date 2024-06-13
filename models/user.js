"use strict";
const { Model, Sequelize } = require("sequelize");
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
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("active", "blocked"),
        allowNull: false,
        defaultValue: "active",
      },
      twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      twoFactorSecret: DataTypes.STRING,
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM(
          "admin",
          "doctor",
          "replacing doctor",
          "assistant",
          "secretary"
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      //hook to set value of status to blocked when isBlocked is true
      hooks: {
        beforeSave: async (user, options) => {
          if (user.isBlocked) {
            user.status = "blocked";
          } else {
            user.status = "active";
          }
        },
      },
      // Include createdAt and updatedAt fields
      timestamps: true,
      // Specify the name of the createdAt column
      createdAt: "createdAt",
      // Specify the name of the updatedAt column
      updatedAt: "updatedAt",
    }
  );
  return User;
};
