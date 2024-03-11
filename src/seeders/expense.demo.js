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
                title: "ဝန်ထမ်းလစာ",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 4,
                title: "ခြင်း​တောင်းဝယ်",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                id: 5,
                title: "Cloud Server Fees",
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
