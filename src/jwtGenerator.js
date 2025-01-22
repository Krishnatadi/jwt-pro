const crypto = require("crypto");
const { generateUUID } = require("../utils/uuidUtil");
const { getExpiryTimestamp } = require("../utils/timeUtil");
const { supportedAlgorithms } = require("./config");

/**
 * Generates a signed JWT token.
 * @param {object} header - JWT header object.
 * @param {object} payload - JWT payload object.
 * @param {string} secret - Secret key for signing the token.
 * @param {number} expiresIn - Expiration time in seconds (default 3600s).
 * @returns {string} Signed JWT token.
 */
function generateToken(header, payload, secret, expiresIn = 3600) {
  if (!header || !payload || !secret) {
    throw new Error("Header, payload, and secret are required.");
  }

  if (!supportedAlgorithms.includes(header.alg)) {
    throw new Error(`Unsupported algorithm: ${header.alg}`);
  }

  // Add unique identifier (UUID) and expiration time to the payload
  payload.jti = generateUUID();
  payload.exp = getExpiryTimestamp(expiresIn);

  // Convert header and payload to Base64URL encoding
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");

  // Create signature using HMAC algorithm
  const signatureInput = `${base64Header}.${base64Payload}`;
  const signature = crypto.createHmac(header.alg.replace("HS", "sha"), secret)
                          .update(signatureInput)
                          .digest("base64url");

  return `${signatureInput}.${signature}`;
}

module.exports = { generateToken };
