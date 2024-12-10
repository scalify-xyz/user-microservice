import { hash, verify } from "argon2";
import { IArgon2GatewayProvider, IHashOptions, IVerifyOptions } from "../../domain/gateway/providers/argon2.gateway.provider";

export class Argon2Provider implements IArgon2GatewayProvider {
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
