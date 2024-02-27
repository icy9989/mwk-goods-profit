module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define(
      "unit",
      {
        id: {
          field: "id",
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          field: "title",
          type: Sequelize.STRING(255),
        }
      },
      {
        paranoid: true,
      }
    );
  
    return Unit;
  };
  