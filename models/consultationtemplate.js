module.exports = (sequelize, DataTypes) => {
  const ConsultationTemplate = sequelize.define("ConsultationTemplate", {
    name: DataTypes.STRING,
  });

  ConsultationTemplate.associate = (models) => {
    ConsultationTemplate.hasMany(models.Section, { as: "sections" });
  };

  return ConsultationTemplate;
};
