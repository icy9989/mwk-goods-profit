"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', 
        [
            {
                id: 1,
                name: "​ဂေါ်ဖီ",
                category_id: 2,
                unit_id: 1,
                percentage: 60,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                name: "​ဘိုစားပဲသီး",
                category_id: 2,
                unit_id: 2,
                percentage: 20,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                name: "မုန်ညှင်းဖြူ",
                category_id: 2,
                unit_id: 2,
                percentage: 25,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                name: "သံပုယို",
                category_id: 1,
                unit_id: 1,
                percentage: 18.75,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                name: "ခရမ်းချဥ်သီး",
                category_id: 1,
                unit_id: 2,
                percentage: 50,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 6,
                name: "ကြက်သား",
                category_id: 3,
                unit_id: 2,
                percentage: 12.25,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 7,
                name: "တရုတ်နံနံ",
                category_id: 2,
                unit_id: 3,
                percentage: 66,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], 
    {});
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("products", null, {})
  },
};
