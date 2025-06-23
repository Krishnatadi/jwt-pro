# jwt pro
**jwt-pro** is a powerful, developer-friendly Node.js library and CLI tool for securely handling JSON Web Tokens (JWTs). It provides token generation, decoding, validation, and structure inspection — with support for both programmatic and terminal-based use.


![Release](https://img.shields.io/npm/v/jwt-pro)
![Downloads](https://img.shields.io/npm/dw/jwt-pro)
[![License](https://img.shields.io/:license-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)
---

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):


Install the package using npm/yarn/cli:

```bash
npm install jwt-pro
```
or
```bash
yarn add jwt-pro
```
or
```bash
# install globally for CLI use
npm install -g jwt-pro
```

---

## Use Cases

- **Authentication**: Use JWTs to authenticate users in modern web, mobile, or desktop applications.
- **Authorization**: Encode user roles, permissions, and scopes in the token payload for fine-grained access control.
- **API Security**: Protect REST or GraphQL APIs and enable secure communication between microservices.
- **Session Management**: Use token expiration (`exp`) to manage stateless user sessions.
- **Token Inspection**: Decode tokens (header or payload) without verifying to debug or inspect contents.
- **Validation Tools**: Ensure the structure and format of incoming tokens are valid before processing.

---

## Benefits for Developers

- **Secure by Design**: Supports industry-standard HMAC and RSA algorithms for signing and verifying JWTs.
- **Flexible Payloads**: Add custom claims, IDs, scopes, and expiration in headers or payloads.
- **User-Friendly API**: Minimal and intuitive API for generating, decoding, verifying, and validating tokens.
- **Lightweight**: No external dependencies — fast and optimized for Node.js environments.
- **TypeScript Ready**: Includes type definitions for `JwtPayload`, `JwtHeader`, and decode/validate functions.
- **CLI Utility**: Built-in CLI tool (`jwt-pro`) for decoding and validating tokens directly from the terminal.
- **Custom Validation**: Easily extend token structure or rules for additional claims or business logic.

---

## Supported Algorithms

| Algorithm | Description          |
|-----------|----------------------|
| HS256     | HMAC using SHA-256    |
| HS384     | HMAC using SHA-384    |
| HS512     | HMAC using SHA-512    |
| RS256     | RSA Signature (SHA-256)|
| RS384     | RSA Signature (SHA-384)|
| RS512     | RSA Signature (SHA-512)|
| ES256     | ECDSA using P-256 curve (SHA-256)|
| ES384     | ECDSA using P-384 curve (SHA-384)|
| ES512     | ECDSA using P-521 curve (SHA-512)|

---

## Features

| Functionality         | Description |
|-----------------------|-------------|
| **Generate JWT**      | Generate signed JWTs with customizable headers, payloads, and expiration time. |
| **Verify JWT**        | Verify JWTs against a secret key and ensure the token is valid and not expired. |
| **Token Expiration**  | Users should provide expiry time in seconds; the default is 3600 seconds (1 hour). |
| **Supported Algorithms** | Supports multiple signing algorithms (HS, RS, ES) for token generation and verification. |
| **Secrets Management** | Provides strong secret key generation and storage recommendations for enhanced security. |
| **Decode JWT**        | Decode JWT header or payload without verifying the signature, useful for debugging. |
| **Validate JWT Format** | Check if the JWT has 3 parts, valid base64url, and valid JSON structure. |
| **CLI Support**       | Use the `jwt-pro` command-line tool to decode or validate tokens directly from terminal. |
| **Error Handling**    | Friendly error messages for malformed, expired, or invalid tokens. |
| **Minimal & Fast**    | Lightweight package with no external dependencies and fast processing. |

---

# jwt-pro CLI Usage

A simple CLI tool to decode and validate JSON Web Tokens (JWTs).

## Usage

```bash
jwt-pro <JWT> [--header] [--validate]
--header     Decode the token header instead of the payload
--validate   Only validate token structure (no decoding)
--help, -h   Show usage help

```

### Decode Payload
```bash
jwt-pro eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

```

### Decode Header
```bash
jwt-pro eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... --header

```

### Validate Token
```bash
jwt-pro eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... --validate

```
---

## Programmatic Usage
### Importing the Package

```javascript
const { generateToken, verifyToken, jwtDecode, validateJwt } = require("jwt-pro");
```

### JWT Generation
``` javascript
const { generateToken } = require('jwt-pro');

const header = { alg: "HS256", typ: "JWT" };
const payload = { "user": "john_doe", "role": "admin", "permissions": ["read", "write", "delete"] };
const secret = "supersecretkey"; // Use a strong secret key, e.g., from `random-password-toolkit` npm package.
const expiresIn = 3600; // User should provide expiry time in seconds; default is 3600 seconds (1 hour)

const token = generateToken(header, payload, secret, expiresIn);
console.log("Generated Token:", token);
// output: Generated Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiam9obl9kb2UiLCJyb2xlIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXSwianRpIjoiNjMyJpdGUiLCJkZWxldGUiXSwianRpIjoiNjMyN2U3MmQtZGQ1MC00Y2U1LTJlZmEtNGZjZjAxYjkyMDcyIiwiZXhwIjoxNzM3NTUzMzQ0fQ.a_AUEgpvlB-e4GhJc9-NljUQgaljFowYbsv1Jjjbebg
```


### JWT Verification
```javascript
const { verifyToken } = require('jwt-pro');

const token = 'your-jwt-token';
const secret = 'supersecretkey';
const payload = verifyToken(token, secret);
console.log("Verified Payload:", payload);
```

### Decode JWT
```javascript
const { jwtDecode } = require('jwt-pro');

const payload = jwtDecode(token);               // decode payload
const header = jwtDecode(token, { header: true }); // decode header
```

### Validate JWT Format
```javascript
const { validateJwt } = require('jwt-pro');

try {
  validateJwt(token);
  console.log("JWT is valid.");
} catch (err) {
  console.error("Invalid JWT:", err.message);
}

```

> [!NOTE]
> Sample JWT Token:  
> `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiam9obl9kb2UiLCJyb2xlIjoiYWRtaW4iLCJwZXJtaXNzaW9ucyI6WyJyZWFkIiwid3JpdGUiLCJkZWxldGUiXSwianRpIjoiNmI2NTIzZTAtYzA2Ny00MmZlLTg2YjMtYzI4MmFmMTA3MTUwIiwiZXhwIjoxNzUwNjU5OTgwfQ.iVZj2YGyeFU9J7i7DhoAV44BENsNsd8nEWhH_Es2VyE`



### Secret Key Generation
For better security, use a strong secret key generator such as the **random-password-toolkit** npm package:
```javascript
npm install random-password-toolkit

const random6DigitNumber = generateRandomNumber(100000, 999999, 6);
console.log(random6DigitNumber);  
// Output: A 6-digit number, e.g., "539812"
```

---

## Use with TypeScript

The return type of the `jwtDecode` function is determined by the `header` option passed as the second argument.  
If omitted (or set to `false`), it defaults to returning a `JwtPayload`.  
If `header: true` is passed, it returns a `JwtHeader`.  

You can also **explicitly specify** the expected return type using a type argument, and extend both `JwtPayload` and `JwtHeader` as needed.

```ts
import { jwtDecode, JwtPayload } from "jwt-pro";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const decoded = jwtDecode<JwtPayload>(token); // Typed as JwtPayload
```

---

## Include via Script Tag (Browser)

To use **jwt-pro** in a browser directly:

1. Copy the bundled ESM file (e.g., `dist/jwt-pro.js`) to your project.
2. Import it using a `<script>` tag with `type="module"`:

```html
<script type="module">
  import { jwtDecode } from '/path/to/jwt-pro.js';

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
  const decoded = jwtDecode(token);
  console.log(decoded);
</script>
```
> Note: Make sure you generate the browser bundle using a bundler like esbuild or rollup, and place it in your dist/ folder.

---

## Community and Ecosystem

By using **JWT PRO**, you are joining a growing community of developers who are passionate about secure passwords and encryption. We encourage you to share your experiences, ideas, and feedback on GitHub Discussions or any community platform of your choice.

- **GitHub Discussions**: Share use cases, report bugs, and suggest features.

We'd love to hear from you and see how you're using **JWT PRO** in your projects!

---

## Issues and Feedback
For issues, feedback, and feature requests, please open an issue on our [GitHub Issues page](http://github.com/krishnatadi/jwt-pro/issues). We actively monitor and respond to community feedback.

