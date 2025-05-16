const { Model } = require("sequelize"); module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {}

  Tax.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    Tax.hasMany(models.InvoiceItemTax, { foreignKey: 'taxId' });
  };

  return Tax;
}; 