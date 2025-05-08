'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('invoice_item_taxes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoice_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'invoice_items',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      tax_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'taxes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      tax_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      tax_rate: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      tax_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('invoice_item_taxes', ['invoice_item_id']);
    await queryInterface.addIndex('invoice_item_taxes', ['tax_id']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('invoice_item_taxes');
  }
}; 