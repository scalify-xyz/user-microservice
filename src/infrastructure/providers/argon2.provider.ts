import { hash, verify } from "argon2";

export class Argon2Provider {
  public static create() {
    return new Argon2Provider();
  }

  public async hash(password: string | Buffer): Promise<string> {
    try {
      return await hash(password);
    } catch (error) {
      throw new Error(`Hashing failed: ${error.message}`);
    }
  }

  public async verify(
    digest: string,
    password: string | Buffer,
  ): Promise<boolean> {
    try {
      return await verify(digest, password);
    } catch (error) {
      throw new Error(`Verification failed: ${error.message}`);
    }
  }
}
