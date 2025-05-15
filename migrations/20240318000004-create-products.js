'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      sku: {
        type: Sequelize.STRING(100)
      },
      unit: {
        type: Sequelize.STRING(50)
      },
      regular_price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0.00
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

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
}; 