module.exports = (sequelize, DataTypes) => {
  class InvoiceItemTax extends sequelize.Model {}

  InvoiceItemTax.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoiceItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'invoice_item_id',
      references: {
        model: 'invoice_items',
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
    modelName: 'InvoiceItemTax',
    tableName: 'invoice_item_taxes',
    timestamps: false
  });

  InvoiceItemTax.associate = (models) => {
    InvoiceItemTax.belongsTo(models.InvoiceItem, { foreignKey: 'invoiceItemId' });
    InvoiceItemTax.belongsTo(models.Tax, { foreignKey: 'taxId' });
  };

  return InvoiceItemTax;
}; 