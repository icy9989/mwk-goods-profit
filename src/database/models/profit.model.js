module.exports = (sequelize, Sequelize) => {
    const Profit = sequelize.define(
      "profit",
      {
        id: {
          field: "id",
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        dailyCost: {
            field: "dailyCost",
            type: Sequelize.INTEGER
        },
        dailySell: {
            field: "dailySell",
            type: Sequelize.INTEGER
        },
        dailyExpense: {  
            field: "dailyExpense",
            type: Sequelize.INTEGER
        },
        date: {
            field: "date",
            type: Sequelize.DATEONLY
        },
      },
      {
        paranoid: true,
      }
    );
  
    return Profit;
  };
  