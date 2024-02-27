"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('units', 
        [
            {
                id: 1,
                title: "လုံး",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                title: "ပိသာ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                title: "စည်း",
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], 
    {});
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("units", null, {})
  },
};
