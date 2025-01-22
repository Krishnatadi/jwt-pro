const { generateToken } = require("./src/jwtGenerator");
const { verifyToken } = require("./src/jwtVerifier");

module.exports = {
  generateToken,
  verifyToken
};
