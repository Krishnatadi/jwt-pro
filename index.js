const { generateToken } = require("./src/jwtGenerator");
const { verifyToken } = require("./src/jwtVerifier");
const { jwtDecode } = require("./src/decode");
const { validateJwt } = require("./src/jwtValidation")

module.exports = {
  generateToken,
  verifyToken,
  jwtDecode,
  validateJwt
};
