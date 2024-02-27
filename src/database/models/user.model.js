const { encrypt } = require("../../utils/crypto");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        id: {
          field: "id",
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          field: "username",
          type: Sequelize.STRING(50),
        },
        password: {
          field: "password",
          type: Sequelize.STRING(255),
        },
      },
      {
        paranoid: true,
      }
    );

    return User;
  };
  