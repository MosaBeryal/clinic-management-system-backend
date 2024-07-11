module.exports = (sequelize, DataTypes) => {
  const AssignedField = sequelize.define("AssignedField", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    // Other attributes as needed
  });

  AssignedField.associate = (models) => {
    AssignedField.belongsTo(models.AssignedSection, {
      foreignKey: "AssignedSectionId",
      onDelete: "CASCADE",
    });
  };

  return AssignedField;
};
