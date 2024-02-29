module.exports = (sequelize, Sequelize) => {
    const SaleTransaction = sequelize.define(
      "sale_tranaction",
      {
        id: {
          field: "id",
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        productId: {
            field: "productId",
            type: Sequelize.INTEGER,
            references: {
              model: "products",
              key: "id"
            }
        },
        buyCount: {
            field: "buyCount",
            type: Sequelize.DOUBLE,
        },
        buyUnitPrice: {
            field: "buyUnitPrice",
            type: Sequelize.INTEGER,
        },
        buyTotalPrice: {
            field: "buyTotalPrice",
            type: Sequelize.INTEGER,
        },
        sellCount: {
            field: "sellCount",
            type: Sequelize.DOUBLE,
        },
        sellUnitPrice: {
            field: "sellUnitPrice",
            type: Sequelize.INTEGER,
        },
        sellTotalPrice: {
            field: "sellTotalPrice",
            type: Sequelize.INTEGER,
        },
        profit: {
            field: "profit",
            type: Sequelize.INTEGER,
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
  
    return SaleTransaction;
};
  