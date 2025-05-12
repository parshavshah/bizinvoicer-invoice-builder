const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {}

  Setting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      applicationName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "application_name",
      },
      softwareLogo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "software_logo",
      },
      currency: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      numberFormat: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "number_format",
      },
      dateFormat: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "date_format",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Setting",
      tableName: "settings",
      timestamps: true,
    }
  );

  return Setting;
};
