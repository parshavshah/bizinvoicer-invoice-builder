"use strict";

const { USER_ROLES, PERMISSIONS } = require("../utils/constants");
const db = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = Object.values(USER_ROLES);
    const permissions = [];
    const now = new Date();

    roles.forEach((role) => {
      PERMISSIONS.forEach((perm) => {
        perm.actions.forEach((action) => {
          permissions.push({
            role,
            module: perm.name,
            action,
            allowed: "yes",
            created_at: now,
            updated_at: now,
          });
        });
      });
    });

    await queryInterface.bulkInsert("role_permissions", permissions, {});
  },

  down: async (queryInterface, Sequelize) => {
    const roles = Object.values(USER_ROLES);
    const modules = PERMISSIONS.map((p) => p.name);
    await queryInterface.bulkDelete(
      "role_permissions",
      {
        role: roles,
        module: modules,
      },
      {}
    );
  },
}; 