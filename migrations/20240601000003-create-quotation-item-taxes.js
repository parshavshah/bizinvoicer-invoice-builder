'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotation_item_taxes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      quotation_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
      },
      tax_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
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

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('quotation_item_taxes');
  }
}; 