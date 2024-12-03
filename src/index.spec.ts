import { configurationRoutes } from "./index";
import { ApiExpress } from "./infra/api/express/api.express";

jest.mock("./infra/repositories/prisma/package", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  },
}));

jest.mock("./infra/packages/argon2/package", () => ({
  argon2Package: {
    hash: jest.fn(),
    verify: jest.fn(),
  },
}));

jest.mock("./infra/packages/jsonwebtoken/package", () => ({
  jsonwebtokenPackage: {
    sign: jest.fn(),
    verify: jest.fn(),
  },
}));

jest.mock("./infra/repositories/prisma/user.repository.prisma", () => ({
  UserRepositoryPrisma: {
    create: jest.fn(),
  },
}));

jest.mock("./usecases/create-user/create-user.usecase", () => ({
  CreateUserUsecase: {
    create: jest.fn(),
  },
}));

jest.mock("./usecases/auth-user/auth-user.usecase", () => ({
  AuthUserUsecase: {
    create: jest.fn(),
  },
}));

jest.mock("./usecases/change-password-user/change-password-user.usecase", () => ({
  ChangePasswordUserUsecase: {
    create: jest.fn(),
  },
}));

jest.mock("./infra/api/express/routes/create-user.express.route", () => ({
  CreateUserRoute: {
    create: jest.fn().mockReturnValue({
      method: "POST",
      path: "/users",
    }),
  },
}));

jest.mock("./infra/api/express/routes/auth-user.express.route", () => ({
  AuthUserRoute: {
    create: jest.fn().mockReturnValue({
      method: "POST",
      path: "/login",
    }),
  },
}));

jest.mock("./infra/api/express/routes/change-password-user.express.route", () => ({
  ChangePasswordUserRoute: {
    create: jest.fn().mockReturnValue({
      method: "POST",
      path: "/change-password",
    }),
  },
}));

jest.mock("./infra/api/express/api.express", () => ({
  ApiExpress: {
    create: jest.fn((routes) => ({
      start: jest.fn(),
      routes,
    })),
  },
}));

describe("Configuration of Routes", () => {
  it("should configure the routes correctly", () => {
    const routes = configurationRoutes();

    expect(routes).toHaveLength(3);
    expect(routes[0]).toEqual({
      method: "POST",
      path: "/users",
    });
    expect(routes[1]).toEqual({
      method: "POST",
      path: "/login",
    });
    expect(routes[2]).toEqual({
      method: "POST",
      path: "/change-password",
    });


    const api = ApiExpress.create(routes);
    api.start(8080);
    expect(api.start).toHaveBeenCalledWith(8080);
    expect(api.routes).toEqual(routes);
  });
});
