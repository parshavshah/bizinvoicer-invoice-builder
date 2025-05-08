'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('product_taxes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
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
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('product_taxes', ['product_id']);
    await queryInterface.addIndex('product_taxes', ['tax_id']);
    await queryInterface.addConstraint('product_taxes', {
      fields: ['product_id', 'tax_id'],
      type: 'unique',
      name: 'unique_product_tax'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('product_taxes');
  }
}; 