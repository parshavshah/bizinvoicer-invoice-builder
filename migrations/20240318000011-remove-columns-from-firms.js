"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("firms", "date_format");
    await queryInterface.removeColumn("firms", "number_format");
    await queryInterface.removeColumn("firms", "default_currency");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("firms", "date_format", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("firms", "date_format", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addColumn("firms", "default_currency", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },
};
