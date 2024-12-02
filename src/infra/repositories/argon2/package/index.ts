import { hash, verify } from "argon2";

interface VerifyOptions {
    secret?: Buffer;
}

interface VerifyFunction {
    (digest: string, password: Buffer | string, options?: VerifyOptions): Promise<boolean>;
}
interface HashOptions {
    raw?: boolean;
    salt?: Buffer;
    hashLength?: number;
    secret?: Buffer;
    type?: 0 | 1 | 2;
    version?: number;
    memoryCost?: number;
    timeCost?: number;
    parallelism?: number;
    associatedData?: Buffer;
}

interface HashFunction {
    (password: Buffer | string, options: HashOptions & { raw: true }): Promise<Buffer>;
    (password: Buffer | string, options?: HashOptions & { raw?: false }): Promise<string>;
}

export type Argon2Package = {
    hash: HashFunction,
    verify: VerifyFunction,
}

export const argon2Package: Argon2Package = { hash, verify };
