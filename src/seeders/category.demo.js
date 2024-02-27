"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', 
        [
            {
                id: 1,
                title: "အသီးအနှံများ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                title: "ဟင်းသီးဟင်းရွက်များ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                title: "အသားငါးများ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], 
    {});
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("categories", null, {})
  },
};
