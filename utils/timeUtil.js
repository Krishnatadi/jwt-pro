/**
 * Returns a timestamp for token expiration.
 * @param {number} expiresIn - Expiration time in seconds.
 * @returns {number} Expiration timestamp in seconds.
 */
function getExpiryTimestamp(expiresIn) {
  return Math.floor(Date.now() / 1000) + expiresIn;
}

module.exports = { getExpiryTimestamp };

