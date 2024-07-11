// models/section.js
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    sectionTitle: DataTypes.STRING,
    ConsultationTemplateId: DataTypes.INTEGER,
  });

  Section.associate = (models) => {
    Section.belongsTo(models.ConsultationTemplate);
    Section.hasMany(models.Field, { as: 'sectionFields' });
  };

  return Section;
};
