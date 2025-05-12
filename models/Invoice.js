const { Model } = require("sequelize"); module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {}

  Invoice.init({
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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'client_id',
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    firmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'firm_id',
      references: {
        model: 'firms',
        key: 'id'
      }
    },
    invoiceNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'invoice_number'
    },
    reference: {
      type: DataTypes.STRING(100)
    },
    issueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'issue_date'
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'due_date'
    },
    status: {
      type: DataTypes.ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled'),
      defaultValue: 'draft'
    },
    notes: {
      type: DataTypes.TEXT
    },
    subtotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    taxTotal: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00,
      field: 'tax_total'
    },
    total: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0.00
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
    modelName: 'Invoice',
    tableName: 'invoices',
    timestamps: true
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.User, { foreignKey: 'userId' });
    Invoice.belongsTo(models.Client, { foreignKey: 'clientId' });
    Invoice.belongsTo(models.Firm, { foreignKey: 'firmId' });
    Invoice.hasMany(models.InvoiceItem, { foreignKey: 'invoiceId' });
  };

  return Invoice;
}; 