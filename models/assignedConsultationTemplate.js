module.exports = (sequelize, DataTypes) => {
  const AssignedConsultationTemplate = sequelize.define(
    "AssignedConsultationTemplate",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
  );

  AssignedConsultationTemplate.associate = (models) => {
    AssignedConsultationTemplate.hasMany(models.AssignedSection, {
      as: "sections",
      foreignKey: "assignedConsultationTemplateId",
    });

    AssignedConsultationTemplate.hasMany(models.ConsultationFiles, {
      as: "consultationFiles",
      foreignKey: "assignedConsultationTemplateId", 
    });

    AssignedConsultationTemplate.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE",
    });
  };

  return AssignedConsultationTemplate;
};
