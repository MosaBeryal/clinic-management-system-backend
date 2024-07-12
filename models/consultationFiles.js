module.exports = (sequelize, DataTypes) => {
  const ConsultationFiles = sequelize.define("ConsultationFiles", {
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ConsultationFiles.associate = (models) => {
    ConsultationFiles.belongsTo(models.Consultation, {
      foreignKey: "consultationId",
      onDelete: "CASCADE",
    });
    ConsultationFiles.belongsTo(models.AssignedConsultationTemplate, {
      foreignKey: "assignedConsultationTemplateId",
      onDelete: "CASCADE",
    });
  };

  return ConsultationFiles;
};
