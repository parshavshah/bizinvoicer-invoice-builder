"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("firms", "user_id");
    await queryInterface.removeColumn("clients", "user_id");
    await queryInterface.removeColumn("products", "user_id");
    await queryInterface.removeColumn("taxes", "user_id");
    await queryInterface.removeColumn("invoices", "user_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("firms", "user_id", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("clients", "user_id", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("products", "user_id", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("taxes", "user_id", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("invoices", "user_id", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },
};
