// models/field.js
module.exports = (sequelize, DataTypes) => {
  const Field = sequelize.define("Field", {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    SectionId: DataTypes.INTEGER,
  });

  Field.associate = (models) => {
    Field.belongsTo(models.Section, {
      foreignKey: "SectionId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return Field;
};
