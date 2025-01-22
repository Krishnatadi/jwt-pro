export interface JwtHeader {
    alg: string;
    typ: string;
  }
  
  export interface JwtPayload {
    [key: string]: any;
    exp?: number;
    jti?: string;
  }
  
  export function generateToken(header: JwtHeader, payload: JwtPayload, secret: string, expiresIn?: number): string;
  
  export function verifyToken(token: string, secret: string): JwtPayload;
  