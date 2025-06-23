#!/usr/bin/env node

"use strict";

const { jwtDecode } = require("../src/decode");
const { validateJwt } = require("../src/jwtValidation");

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage:
  jwt-pro <JWT> [--header] [--validate]

Options:
  --header      Decode header instead of payload
  --validate    Validate token structure only (does not decode)
  --help, -h    Show help

Examples:
  jwt-pro <your-token>               → decode payload
  jwt-pro <your-token> --header     → decode header
  jwt-pro <your-token> --validate   → just validate token
`);
  process.exit(0);
}

const token = args[0];
const isHeader = args.includes("--header");
const isValidateOnly = args.includes("--validate");

try {
  validateJwt(token);

  if (isValidateOnly) {
    console.log("JWT is valid.");
    process.exit(0);
  }

  const decoded = jwtDecode(token, { header: isHeader });
  console.log(JSON.stringify(decoded, null, 2));
} catch (err) {
  console.error("Error:", err.message);
  process.exit(1);
}
