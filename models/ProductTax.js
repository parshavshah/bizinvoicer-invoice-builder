const { Model } = require("sequelize"); module.exports = (sequelize, DataTypes) => {
  class ProductTax extends Model {}

  ProductTax.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id'
      }
    },
    taxId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'tax_id',
      references: {
        model: 'taxes',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    sequelize,
    modelName: 'ProductTax',
    tableName: 'product_taxes',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['product_id', 'tax_id']
      }
    ]
  });

  ProductTax.associate = (models) => {
    ProductTax.belongsTo(models.Product, { foreignKey: 'productId' });
    ProductTax.belongsTo(models.Tax, { foreignKey: 'taxId' });
  };

  return ProductTax;
}; 