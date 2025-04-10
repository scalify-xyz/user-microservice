import CleanBearerToken from "./clean-bearer-token.util";

describe("CleanBearerToken", () => {
  it("should create a token successfully with valid header", () => {
    const tokenHeader = "Bearer valid-token-123";

    const cleanToken = CleanBearerToken.create(tokenHeader);

    expect(cleanToken).toBeInstanceOf(CleanBearerToken);
    expect(cleanToken.getToken()).toBe("valid-token-123");
  });

  it("should throw an error if token header is missing", () => {
    const tokenHeader = "";

    expect(() => CleanBearerToken.create(tokenHeader)).toThrow(
      "Token header is required",
    );
  });

  it("should throw an error if token format is invalid", () => {
    const invalidTokenHeader1 = "Bearer";
    const invalidTokenHeader2 = "Bearer123 invalid-token";

    expect(() => CleanBearerToken.create(invalidTokenHeader1)).toThrow(
      'Invalid token format. Expected "Bearer <token>"',
    );
    expect(() => CleanBearerToken.create(invalidTokenHeader2)).toThrow(
      'Invalid token format. Expected "Bearer <token>"',
    );
  });

  it('should throw an error if token does not start with "Bearer"', () => {
    const invalidTokenHeader = "Basic valid-token-123";

    expect(() => CleanBearerToken.create(invalidTokenHeader)).toThrow(
      'Invalid token format. Expected "Bearer <token>"',
    );
  });
});
