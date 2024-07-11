// models/consultationtemplate.js
module.exports = (sequelize, DataTypes) => {
  const ConsultationTemplate = sequelize.define("ConsultationTemplate", {
    name: DataTypes.STRING,
  });

  ConsultationTemplate.associate = (models) => {
    ConsultationTemplate.hasMany(models.Section, { as: "sections" });
    ConsultationTemplate.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return ConsultationTemplate;
};
