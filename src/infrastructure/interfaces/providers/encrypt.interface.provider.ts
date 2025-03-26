export type IEncryptProvider = {
    hash(password: string | Buffer, options?: IHashOptions): Promise<string>;
    verify(digest: string, password: string | Buffer, options?: IVerifyOptions): Promise<boolean>;
}

export type IVerifyOptions = {
    secret?: Buffer;
}

export type IHashOptions = {
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
