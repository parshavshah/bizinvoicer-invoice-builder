'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('quotations', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
       
      },
      firm_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      
      },
      quotation_number: {
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
        type: Sequelize.ENUM('draft', 'sent', 'accepted', 'rejected', 'cancelled'),
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

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('quotations');
  }
}; 