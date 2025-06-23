"use strict";

function jwtDecode(token, options = {}) {
  if (typeof token !== "string") {
    throw new Error("Token must be a string");
  }

  const tokenParts = token.split(".");
  const targetIndex = options.header === true ? 0 : 1;
  const tokenSegment = tokenParts[targetIndex];

  if (typeof tokenSegment !== "string") {
    throw new Error(`Token is missing part #${targetIndex + 1}`);
  }

  try {
    const decodedString = decodeBase64Url(tokenSegment);
    return JSON.parse(decodedString);
  } catch (error) {
    throw new Error(`Failed to decode token part #${targetIndex + 1}: ${error.message}`);
  }
}

function decodeBase64Url(encodedString) {
  let base64 = encodedString.replace(/-/g, "+").replace(/_/g, "/");

  // Pad the base64 string if required
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }

  try {
    return Buffer.from(base64, "base64").toString("utf-8");
  } catch (error) {
    throw new Error("Invalid base64 encoding: " + error.message);
  }
}


module.exports = {
  jwtDecode
};