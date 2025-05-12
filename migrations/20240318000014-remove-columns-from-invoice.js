"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("invoices", "currency");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("invoices", "currency", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },
};
