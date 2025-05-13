const { Model } = require("sequelize"); module.exports = (sequelize, DataTypes) => {
  class InvoiceItem extends Model {}

  InvoiceItem.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'invoice_id',
      references: {
        model: 'invoices',
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
    modelName: 'InvoiceItem',
    tableName: 'invoice_items',
    timestamps: true
  });

  InvoiceItem.associate = (models) => {
    InvoiceItem.belongsTo(models.Invoice, { foreignKey: 'invoiceId' });
    InvoiceItem.belongsTo(models.Product, { foreignKey: 'productId' });
    InvoiceItem.hasMany(models.InvoiceItemTax, { foreignKey: 'invoiceItemId' });
  };

  return InvoiceItem;
}; 