const { uniqueIDGenerator } = require("alluuid");

/**
 * Generates a Version 4 UUID using the alluuid package.
 * @returns {string} UUID string.
 */
function generateUUID() {
  return uniqueIDGenerator.uuidv4();
}

module.exports = { generateUUID };
