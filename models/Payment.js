"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {}

  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "invoice_id",
        references: {
          model: "invoices",
          key: "id",
        },
      },
      paymentMethodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "payment_method_id",
        references: {
          model: "payment_methods",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      paymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "payment_date",
      },
      referenceNumber: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "reference_number",
      },
      transactionId: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "transaction_id",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "completed",
          "failed",
          "cancelled",
          "refunded"
        ),
        defaultValue: "completed",
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "created_by",
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "Payment",
      tableName: "payments",
      timestamps: true,
    }
  );

  Payment.associate = (models) => {
    Payment.belongsTo(models.Invoice, {
      foreignKey: "invoice_id",
    });

    Payment.belongsTo(models.PaymentMethod, {
      foreignKey: "payment_method_id",
    });

    Payment.belongsTo(models.User, {
      foreignKey: "created_by",
    });
  };

  return Payment;
};
