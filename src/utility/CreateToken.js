var jwt = require("jsonwebtoken");

const CreateToken = async (data) => {
  const payload = { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, data }; // 1 day
  return await jwt.sign(payload, "rahul123");
};

module.exports = CreateToken;