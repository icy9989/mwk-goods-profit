module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define(
      "product",
      {
        id: {
          field: "id",
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          field: "name",
          type: Sequelize.STRING(255),
        },
        categoryId: {
            field: "category_id",
            type: Sequelize.INTEGER,
            references: {
              model: "categories",
              key: "id"
            }
        },
        unitId: {
            field: "unit_id",
            type: Sequelize.INTEGER,
            references: {
              model: "units",
              key: "id"
            }
        },
        percentage: {
          field: "percentage",
          type: Sequelize.DOUBLE,
        },
      },
      {
        paranoid: true,
      }
    );
  
    return Product;
  };
  