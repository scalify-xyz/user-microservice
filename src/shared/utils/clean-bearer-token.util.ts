export default class CleanBearerToken {
  private token: string;

  private constructor(tokenHeader: string) {
    if (!tokenHeader) {
      throw new Error("Token header is required");
    }

    const tokenParts = tokenHeader.split(" ");

    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      throw new Error('Invalid token format. Expected "Bearer <token>"');
    }

    this.token = tokenParts[1];
  }

  public static create(tokenHeader: string) {
    return new CleanBearerToken(tokenHeader);
  }

  public getToken(): string {
    return this.token;
  }
}
