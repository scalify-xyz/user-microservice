import { KeyObject } from "crypto";

import { sign, verify } from "jsonwebtoken";

import { IJsonWebTokenProvider } from "@infrastructure/interfaces/providers/jsonwebtoken.interface.provider";

type JwtPayload = { email: string; iat: number };

export class JsonWebTokenProvider implements IJsonWebTokenProvider {

    static create() {
        return new JsonWebTokenProvider();
    }

    sign(
        payload: string | object,
        secretOrPrivateKey: string | Buffer | KeyObject,
        options?: object,
        callback?: (err: Error | null, token?: string) => void,
    ): string | void {
        try {
            return sign(payload, secretOrPrivateKey, options, callback);
        } catch (error) {
            throw new Error(`JWT Signing failed: ${error.message}`);
        }
    }

    verify(
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
        callback?: (err: Error | null, payload?: object | null) => void,
    ): JwtPayload | null {
        try {
            return null;
            // return verify(jwtString, secretOrPublicKey, options, callback);
        } catch (error) {
            throw new Error(`JWT Verification failed: ${error.message}`);
        }
    }
}
