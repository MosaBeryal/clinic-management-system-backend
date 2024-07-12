module.exports = (sequelize, DataTypes) => {
  const AssignedField = sequelize.define("AssignedField", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  });

  AssignedField.associate = (models) => {
    AssignedField.belongsTo(models.AssignedSection, {
      foreignKey: "assignedSectionId",
      onDelete: "CASCADE",
    });
  };

  return AssignedField;
};
