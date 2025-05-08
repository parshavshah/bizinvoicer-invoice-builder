const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Firm extends Model {}

  Firm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        references: {
          model: "users",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.STRING(100),
      },
      state: {
        type: DataTypes.STRING(100),
      },
      postalCode: {
        type: DataTypes.STRING(20),
        field: "postal_code",
      },
      country: {
        type: DataTypes.STRING(100),
      },
      phone: {
        type: DataTypes.STRING(50),
      },
      email: {
        type: DataTypes.STRING(255),
        validate: {
          isEmail: true,
        },
      },
      website: {
        type: DataTypes.STRING(255),
      },
      taxNumber: {
        type: DataTypes.STRING(100),
        field: "tax_number",
      },
      logoPath: {
        type: DataTypes.STRING(255),
        field: "logo_path",
      },
      defaultCurrency: {
        type: DataTypes.STRING(10),
        defaultValue: "USD",
        field: "default_currency",
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
      modelName: "Firm",
      tableName: "firms",
      timestamps: true,
    }
  );

  Firm.associate = (models) => {
    Firm.belongsTo(models.User, { foreignKey: "userId" });
    Firm.hasMany(models.Invoice, { foreignKey: "firmId" });
  };

  return Firm;
};
