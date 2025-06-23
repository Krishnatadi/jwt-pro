// Example JWT usage with `jwt-pro`

const { jwtDecode, generateToken, verifyToken, validateJwt } = require('jwt-pro');

// GENERATE TOKEN
const secret = 'supersecretkey';
const header = { alg: "HS256", typ: "JWT" };
const payload = {
  user: "john_doe",
  role: "admin",
  permissions: ["read", "write", "delete"]
};
const expiresIn = 3600; // 1 hour in seconds

const token = generateToken(header, payload, secret, expiresIn);
console.log("\n Generated Token:\n", token);

// DECODE TOKEN
try {
  const decodedHeader = jwtDecode(token, { header: true });
  const decodedPayload = jwtDecode(token);

  console.log("\n Decoded Header:");
  console.log(decodedHeader);

  console.log("\n Decoded Payload:");
  console.log(decodedPayload);
} catch (error) {
  console.error(" Decode Error:", error.message);
}

// VERIFY TOKEN
try {
  const verifiedPayload = verifyToken(token, secret);
  console.log("\nVerified Payload:");
  console.log(verifiedPayload);
} catch (err) {
  console.error("Verification Error:", err.message);
}

// VALIDATE TOKEN (checks structure)
const isValid = validateJwt(token);
console.log("\n Is Token Valid?", isValid);
