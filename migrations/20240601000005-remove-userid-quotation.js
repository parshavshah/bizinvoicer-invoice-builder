"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("quotations", "user_id");
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn("quotations", "user_id", {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    });
  },
};
