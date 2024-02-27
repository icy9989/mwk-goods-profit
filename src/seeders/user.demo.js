"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
        id: 1,
        username: "admin",
        password: "U2FsdGVkX187gR+6nwP2+XE4epZj28he5z4Igkk+lqE=",
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("users", null, {})
  },
};
