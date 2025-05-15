"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "settings",
      [
        {
          software_logo: "/uploads/logo/logo.png",
          currency: "USD",
          number_format: "US",
          date_format: "YYYY-MM-DD",
          application_name: "BizInvoicer: Business Invoice Manager",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("settings", {}, {});
  },
};
