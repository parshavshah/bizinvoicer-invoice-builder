const { Model } = require("sequelize"); module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {}

  Tax.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255)
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'updated_at'
    }
  }, {
    sequelize,
    modelName: 'Tax',
    tableName: 'taxes',
    timestamps: true
  });

  Tax.associate = (models) => {
    Tax.belongsTo(models.User, { foreignKey: 'userId' });
    Tax.hasMany(models.InvoiceItemTax, { foreignKey: 'taxId' });
  };

  return Tax;
}; 