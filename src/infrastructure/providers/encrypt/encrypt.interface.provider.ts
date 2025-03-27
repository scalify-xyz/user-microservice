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
