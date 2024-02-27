module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "category",
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

  return Category;
};
