# jwt pro
`jwt-pro` is a powerful library for generating and verifying JSON Web Tokens (JWTs). It supports multiple algorithms, provides easy to use utilities for token management, and ensures secure handling of JWTs.

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


Install the package using npm/yarn:

```bash
npm install jwt-pro
```
or
```bash
yarn add jwt-pro
```

---

## Use Cases

- **Authentication**: Secure user authentication in web applications.
- **Authorization**: Assign roles and permissions using encoded payloads.
- **API Security**: Secure communication between microservices or with external APIs.
- **Session Management**: Manage user sessions with token expiration and validation.

---

## Benefits for Developers

- **Secure**: Supports HMAC and RSA algorithms for secure token signing.
- **Flexible**: Customizable payload and headers for JWT generation.
- **Easy-to-Use**: Simple API for generating and verifying JWTs.
- **Efficient**: Handles token expiration, UUID generation, and algorithm support seamlessly.

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

| Functionality       | Description |
|---------------------|-------------|
| **Generate JWT**     | Generate signed JWTs with customizable headers, payloads, and expiration time. |
| **Verify JWT**       | Verify JWTs against a secret key and ensure the token is valid and not expired. |
| **Token Expiration** | Users should provide expiry time in seconds; the default is 3600 seconds (1 hour). |
| **Supported Algorithms** | Supports multiple signing algorithms (HS, RS, ES) for token generation and  verification. |
| **Secrets Management** | Provides strong secret key generation and storage recommendations for enhanced security. |

---

## Example Usage
### Importing the Package

```javascript
const { generateToken, verifyToken } = require("jwt-pro");
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
const { verifyToken } = require('jwt-pro/src/jwtVerifier');

const token = 'your-jwt-token';
const secret = 'supersecretkey';
const payload = verifyToken(token, secret);
console.log("Verified Payload:", payload);
```


### Secret Key Generation
For better security, use a strong secret key generator such as the **random-password-toolkit** npm package:
```javascript
npm install random-password-toolkit

const { generatePassword } = require('random-password-toolkit');
const secret = generatePassword({ length: 32, numbers: true, symbols: true });
console.log("Generated Secret Key:", secret);
```

---

## Community and Ecosystem

By using **JWT PRO**, you are joining a growing community of developers who are passionate about secure passwords and encryption. We encourage you to share your experiences, ideas, and feedback on GitHub Discussions or any community platform of your choice.

- **GitHub Discussions**: Share use cases, report bugs, and suggest features.

We'd love to hear from you and see how you're using **JWT PRO** in your projects!

---

## Issues and Feedback
For issues, feedback, and feature requests, please open an issue on our [GitHub Issues page](http://github.com/krishnatadi/jwt-pro/issues). We actively monitor and respond to community feedback.
