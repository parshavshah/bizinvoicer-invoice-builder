const { Model } = require("sequelize"); module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    sku: {
      type: DataTypes.STRING(100)
    },
    unit: {
      type: DataTypes.STRING(50)
    },
    regularPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
      field: 'regular_price'
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
    modelName: 'Product',
    tableName: 'products',
    timestamps: true
  });

  Product.associate = (models) => {
    Product.hasMany(models.InvoiceItem, { foreignKey: 'productId' });
    
  };

  return Product;
}; 