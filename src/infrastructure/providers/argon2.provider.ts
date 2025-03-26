import { hash, verify } from "argon2";

import { IEncryptProvider, IHashOptions, IVerifyOptions } from "@infrastructure/providers/interfaces/encrypt.interface.provider";

export class Argon2Provider implements IEncryptProvider {
    
    static create() {
        return new Argon2Provider();
    }

    async hash(password: string | Buffer, options?: IHashOptions): Promise<string> {
        try {
            const result = await hash(password, options);

            if (options?.raw) {
                if (Buffer.isBuffer(result)) {
                    return result.toString("base64");
                } else {
                    return result;
                }
            }

            return result;
        } catch (error) {
            throw new Error(`Hashing failed: ${error.message}`);
        }
    }

    async verify(digest: string, password: string | Buffer, options?: IVerifyOptions): Promise<boolean> {
        try {
            return await verify(digest, password, options);
        } catch (error) {
            throw new Error(`Verification failed: ${error.message}`);
        }
    }
}
