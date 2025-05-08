'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoices', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      firm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'firms',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      invoice_number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      reference: {
        type: Sequelize.STRING(100)
      },
      issue_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled'),
        defaultValue: 'draft'
      },
      notes: {
        type: Sequelize.TEXT
      },
      subtotal: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      tax_total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      total: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('invoices', ['user_id']);
    await queryInterface.addIndex('invoices', ['client_id']);
    await queryInterface.addIndex('invoices', ['firm_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoices');
  }
}; 