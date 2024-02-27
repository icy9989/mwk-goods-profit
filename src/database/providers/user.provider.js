const db = require("../models");
const userModel = db.user;

const getUserByUsername = async (username) => {
    return await userModel.findOne({
        where: {
            username
        }
    })
}

module.exports = {
    getUserByUsername
}