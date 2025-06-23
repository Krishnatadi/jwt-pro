"use strict";


/**
 * Validates if a JWT is well-formed (header.payload.signature)
 * with valid base64url and JSON in header/payload.
 *
 * @param {string} token - JWT string
 * @throws {Error} if the format is invalid
 * @returns {true} if valid
 */
function validateJwt(token) {
  if (typeof token !== "string") {
    throw new Error("Token must be a string");
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT must have exactly 3 parts separated by dots");
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  if (!encodedHeader || !encodedPayload || !signature) {
    throw new Error("JWT must have non-empty header, payload, and signature");
  }

  try {
    JSON.parse(decodeBase64Url(encodedHeader));
  } catch {
    throw new Error("JWT header must be valid base64url-encoded JSON");
  }

  try {
    JSON.parse(decodeBase64Url(encodedPayload));
  } catch {
    throw new Error("JWT payload must be valid base64url-encoded JSON");
  }

  if (!isBase64Url(signature)) {
    throw new Error("JWT signature must be valid base64url format");
  }

  return true;
}

function decodeBase64Url(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) base64 += "=";
  return Buffer.from(base64, "base64").toString("utf-8");
}

function isBase64Url(str) {
  return /^[A-Za-z0-9\-_]+$/.test(str);
}

module.exports = {
  validateJwt
};
