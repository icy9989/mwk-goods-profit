const { decrypt, encrypt } = require("../utils/crypto");
const { generateToken } = require("../utils/token");
const ApiError = require("../config/customError.config");
const { getUserByUsername } = require("../database/providers/user.provider");

const loginService = async (req) => {

    const { username, password } = req.body;

    const user = await getUserByUsername(username);

    if(!user) {
        throw ApiError.badRequestError("Username မှားယွင်းနေပါသည်။");
    }

    const plain = decrypt(user.password);

    const match = plain === password;

    let token;

    if(match) {
        token = generateToken(user.username);
    } else {
        throw ApiError.badRequestError("Password မှားယွင်းနေပါသည်။");
    }

    return token;
};

module.exports = loginService
  