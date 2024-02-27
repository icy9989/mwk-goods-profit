const jwt = require("jsonwebtoken");

const generateToken = async (username) => {
  return await jwt.sign(
    { loginId: username },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXP_TIME }
  );
};

module.exports = {
  generateToken
};
