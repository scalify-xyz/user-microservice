import { HttpMethod, Route } from "./";

describe("HttpMethod", () => {
  it("should have GET method defined", () => {
    expect(HttpMethod.GET).toBe("get");
  });

  it("should have POST method defined", () => {
    expect(HttpMethod.POST).toBe("post");
  });
});

describe("Route Interface", () => {
  let route: Route;

  beforeEach(() => {
    route = {
      getHandler: jest.fn().mockReturnValue(async () => {}),
      getPath: jest.fn().mockReturnValue("/test"),
      getMethod: jest.fn().mockReturnValue(HttpMethod.GET),
    };
  });

  it("should return correct handler", () => {
    const handler = route.getHandler();
    expect(handler).toBeInstanceOf(Function);
  });

  it("should return correct path", () => {
    const path = route.getPath();
    expect(path).toBe("/test");
  });

  it("should return correct HTTP method", () => {
    const method = route.getMethod();
    expect(method).toBe(HttpMethod.GET);
  });

  it("should return middleware if provided", () => {
    const mockMiddleware = jest.fn();
    route.getMiddleware = jest.fn().mockReturnValue(mockMiddleware);

    const middleware = route.getMiddleware();
    expect(middleware).toBe(mockMiddleware);
  });

  it("should not throw error if middleware is not provided", () => {
    route.getMiddleware = undefined;
    expect(route.getMiddleware).toBeUndefined();
  });
});
