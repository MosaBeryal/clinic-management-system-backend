module.exports = (sequelize, DataTypes) => {
    const AssignedSection = sequelize.define("AssignedSection", {
      sectionTitle: DataTypes.STRING,
    });
  
    AssignedSection.associate = (models) => {
      AssignedSection.hasMany(models.AssignedField, { as: "assignedFields" });
      AssignedSection.belongsTo(models.AssignedTemplate, {
        foreignKey: "assignedConsultationTemplateId",
        onDelete: "CASCADE",
      });
    };
  
    return AssignedSection;
  };
  