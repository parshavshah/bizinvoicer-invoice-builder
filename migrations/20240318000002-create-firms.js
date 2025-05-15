'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('firms', {
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
      address: {
        type: Sequelize.TEXT
      },
      city: {
        type: Sequelize.STRING(100)
      },
      state: {
        type: Sequelize.STRING(100)
      },
      postal_code: {
        type: Sequelize.STRING(20)
      },
      country: {
        type: Sequelize.STRING(100)
      },
      phone: {
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      website: {
        type: Sequelize.STRING(255)
      },
      tax_number: {
        type: Sequelize.STRING(100)
      },
      logo_path: {
        type: Sequelize.STRING(255)
      },
      default_currency: {
        type: Sequelize.STRING(10),
        defaultValue: 'USD'
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
    await queryInterface.dropTable('firms');
  }
}; 