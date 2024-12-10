export interface IArgon2GatewayProvider {
    hash(password: string | Buffer, options?: IHashOptions): Promise<string>; // Sempre retornando string
    verify(digest: string, password: string | Buffer, options?: IVerifyOptions): Promise<boolean>;
}

export interface IVerifyOptions {
    secret?: Buffer;
}

export interface IHashOptions {
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
