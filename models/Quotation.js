const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Quotation extends Model {}

  Quotation.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
    quotationNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'quotation_number'
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
      type: DataTypes.ENUM('draft', 'sent', 'accepted', 'rejected', 'cancelled'),
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
    modelName: 'Quotation',
    tableName: 'quotations',
    timestamps: true
  });

  Quotation.associate = (models) => {
    Quotation.belongsTo(models.Client, { foreignKey: 'clientId' });
    Quotation.belongsTo(models.Firm, { foreignKey: 'firmId' });
    Quotation.hasMany(models.QuotationItem, { foreignKey: 'quotationId' });
  };

  return Quotation;
}; 