const crypto = require("crypto");

/**
 * Verifies a JWT token against the provided secret.
 * @param {string} token - JWT token string.
 * @param {string} secret - Secret key used to verify the token.
 * @returns {object} Decoded payload if the token is valid.
 * @throws Will throw an error if verification fails.
 */
function verifyToken(token, secret) {
  if (!token || !secret) {
    throw new Error("Token and secret are required for verification.");
  }

  const [encodedHeader, encodedPayload, providedSignature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !providedSignature) {
    throw new Error("Invalid token format.");
  }

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const decodedHeader = JSON.parse(Buffer.from(encodedHeader, "base64url").toString());
  const expectedSignature = crypto.createHmac(decodedHeader.alg.replace("HS", "sha"), secret)
                                  .update(signatureInput)
                                  .digest("base64url");

  if (providedSignature !== expectedSignature) {
    throw new Error("Invalid token");
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString());

  if (Date.now() >= payload.exp * 1000) {
    throw new Error("Token has expired.");
  }

  return payload;
}

module.exports = { verifyToken };
