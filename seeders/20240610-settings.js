"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "settings",
      [
        {
          software_logo: "",
          currency: "INR",
          number_format: "US",
          date_format: "DD-MM-YYYY",
          application_name: "Invoice Manager",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("settings", {}, {});
  },
};
