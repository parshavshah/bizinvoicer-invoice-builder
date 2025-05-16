const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class QuotationItemTax extends Model {}

  QuotationItemTax.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    quotationItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'quotation_item_id',
      references: {
        model: 'quotation_items',
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
    taxName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'tax_name'
    },
    taxRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: 'tax_rate'
    },
    taxAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      field: 'tax_amount'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at'
    }
  }, {
    sequelize,
    modelName: 'QuotationItemTax',
    tableName: 'quotation_item_taxes',
    timestamps: false
  });

  QuotationItemTax.associate = (models) => {
    QuotationItemTax.belongsTo(models.QuotationItem, { foreignKey: 'quotationItemId' });
    QuotationItemTax.belongsTo(models.Tax, { foreignKey: 'taxId' });
  };

  return QuotationItemTax;
}; 