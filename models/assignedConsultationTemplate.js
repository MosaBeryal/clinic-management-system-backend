module.exports = (sequelize, DataTypes) => {
  const AssignedTemplate = sequelize.define(
    "AssignedTemplate",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  AssignedTemplate.associate = (models) => {
    AssignedTemplate.hasMany(models.AssignedSection, {
      as: "assignedSections",
      foreignKey: "assignedConsultationTemplateId",
    });
    AssignedTemplate.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE",
    });
  };

  return AssignedTemplate;
};
