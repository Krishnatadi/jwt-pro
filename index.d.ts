export interface JwtHeader {
  alg: string;
  typ: string;
  [key: string]: any;
}

export interface JwtPayload {
  [key: string]: any;
  exp?: number;
  jti?: string;
  iat?: number;
  iss?: string;
  aud?: string;
  sub?: string;
}

export interface JwtDecodeOptions {
  header?: boolean;
}

/**
 * Generates a signed JWT using the specified header, payload, secret, and optional expiration.
 * @param header - The JWT header (e.g., alg and typ).
 * @param payload - The JWT payload.
 * @param secret - Secret key for signing the token.
 * @param expiresIn - Optional expiration time in seconds.
 * @returns Signed JWT string.
 */
export function generateToken(
  header: JwtHeader,
  payload: JwtPayload,
  secret: string,
  expiresIn?: number
): string;

/**
 * Verifies a JWT signature using a secret and returns the decoded payload.
 * @param token - JWT string.
 * @param secret - Secret used to verify the token.
 * @returns Decoded payload.
 * @throws Error if token is invalid or signature doesn't match.
 */
export function verifyToken(
  token: string,
  secret: string
): JwtPayload;

/**
 * Decodes a JWT header or payload without verifying the signature.
 * @param token - JWT string.
 * @param options - Optional: set `{ header: true }` to decode the header.
 * @returns Decoded header or payload as an object.
 * @throws Error if decoding fails.
 */
export function jwtDecode(
  token: string,
  options?: JwtDecodeOptions
): JwtHeader | JwtPayload;

/**
 * Validates if a JWT is well-formed (header.payload.signature),
 * with valid base64url-encoded and JSON-parsable header and payload.
 * @param token - The JWT string to validate.
 * @returns true if the token is valid.
 * @throws Error if the token format is invalid.
 */
export function validateJwtFormat(token: string): true;
