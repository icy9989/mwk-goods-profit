"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('expenses', 
        [
            {
                id: 1,
                title: "ကားဆီထည့်",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 2,
                title: "A4စာရွက်ထုတ်",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 3,
                title: "Villaငွေရှင်းလို",
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ], 
    {});
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("expenses", null, {})
  },
};
