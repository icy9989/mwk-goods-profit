module.exports = (sequelize, Sequelize) => {
    const ExpenseTransaction = sequelize.define(
      "expense_tranaction",
      {
        id: {
          field: "id",
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        expenseId: {
          field: "expenseId",
          type: Sequelize.INTEGER,
          references: {
            model: "expenses",
            key: "id"
          }
        },
        amount: {
          field: "amount",
          type: Sequelize.INTEGER,
        },
        date: {
          field: "date",
          type: Sequelize.DATEONLY
        }
      },
      {
        paranoid: true,
      }
    );
  
    return ExpenseTransaction;
};
  