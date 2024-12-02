import { sign, verify } from "jsonwebtoken";
import { KeyObject } from 'crypto';

type JwtPayload = { email: string; iat: number };

export type jsonwebtokenPackage = {
  sign: (
    payload: string | object,
    secretOrPrivateKey: string | Buffer | KeyObject,
    options?: object,
    callback?: (err: Error | null, token?: string) => void
  ) => string | void,

  verify: (
    jwtString: string,
    secretOrPublicKey: string | Buffer | KeyObject | ((header: object, secretCallback: (err: Error | null, secretOrPublicKey: string | Buffer | KeyObject) => void) => void),
    options: {
      clockTimestamp?: number;
      nonce?: string;
      allowInvalidAsymmetricKeyTypes?: boolean;
      ignoreNotBefore?: boolean;
      ignoreExpiration?: boolean;
      audience?: string | string[];
      issuer?: string | string[];
      subject?: string;
      jwtid?: string;
      maxAge?: string | number;
      clockTolerance?: number;
      complete?: boolean;
    },
    callback?: (err: Error | null, payload?: object | null) => void
  ) =>  JwtPayload | null;
}

export const jsonwebtokenPackage: jsonwebtokenPackage = { sign, verify };
