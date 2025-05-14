const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class QuotationItem extends Model {}

  QuotationItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quotationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quotation_id',
      references: {
        model: 'quotations',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
      references: {
        model: 'products',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    quantity: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      field: 'unit_price'
    },
    discountPercent: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00,
      field: 'discount_percent'
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
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
    modelName: 'QuotationItem',
    tableName: 'quotation_items',
    timestamps: true
  });

  QuotationItem.associate = (models) => {
    QuotationItem.belongsTo(models.Quotation, { foreignKey: 'quotationId' });
    QuotationItem.belongsTo(models.Product, { foreignKey: 'productId' });
    QuotationItem.hasMany(models.QuotationItemTax, { foreignKey: 'quotationItemId' });
  };

  return QuotationItem;
}; 