module.exports = (sequelize, DataTypes) => {
  const ConsultationTemplate = sequelize.define('ConsultationTemplate', {
    name: DataTypes.STRING,
    // Add other attributes as needed
  });

  ConsultationTemplate.associate = (models) => {
    ConsultationTemplate.hasMany(models.Section, { as: 'sections' });
    // Define other associations if needed
  };

  return ConsultationTemplate;
};
