module.exports = (sequelize, Sequelize) => {
    const ProductInstock = sequelize.define(
      "product_instock",
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
        instock: {
            field: "instock",
            type: Sequelize.DOUBLE,
        },
        buyUnitPrice: {
            field: "buyUnitPrice",
            type: Sequelize.INTEGER,
        },
        tempInstock: {
          field: "tempInstock",
          type: Sequelize.DOUBLE,
        },
        isSave: {
          field: "isSave",
          type: Sequelize.BOOLEAN
        }
      }
    );
  
    return ProductInstock;
  };
  