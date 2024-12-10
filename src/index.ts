import { PrismaClient } from "@prisma/client";

import { AuthUserUsecase } from "@usecases/auth-user/auth-user.usecase";
import { ChangePasswordUserUsecase } from "@usecases/change-password-user/change-password-user.usecase";
import { CreateUserUsecase } from "@usecases/create-user/create-user.usecase";

import { ApiExpress } from "@infra/api/express/api.express";
import { AuthUserRoute } from "@infra/api/express/routes/auth-user.express.route";
import { ChangePasswordUserRoute } from "@infra/api/express/routes/change-password-user.express.route";
import { CreateUserRoute } from "@infra/api/express/routes/create-user.express.route";
import { Argon2Provider } from "@infra/providers/argon2.provider";
import { JsonWebTokenProvider } from "@infra/providers/jsonwebtoken.provider";
import { UserRepositoryPrisma } from "@infra/repositories/prisma/user.repository.prisma";

import { AuthenticateMiddleware } from "@shared/middlewares/authenticate.middleware";

interface Dependencies {
  userRepository: UserRepositoryPrisma;
  jsonwebtokenClient: JsonWebTokenProvider;
}

function createDependencies(): Dependencies {
  const prismaClient = new PrismaClient();
  const argon2Client = new Argon2Provider();
  const jsonwebtokenClient = new JsonWebTokenProvider();

  const userRepository = UserRepositoryPrisma.create(prismaClient, argon2Client, jsonwebtokenClient);

  return {
    userRepository,
    jsonwebtokenClient,
  };
}

function configurationRoutes(dependencies: Dependencies) {
  const createUserUsecase = CreateUserUsecase.create(dependencies.userRepository);
  const authUserUsecase = AuthUserUsecase.create(dependencies.userRepository);
  const changePasswordUserUsecase = ChangePasswordUserUsecase.create(dependencies.userRepository);

  const createUserRoute = CreateUserRoute.create(createUserUsecase);
  const authUserRoute = AuthUserRoute.create(authUserUsecase);
  const changePasswordUserRoute = ChangePasswordUserRoute.create(changePasswordUserUsecase);
  
  changePasswordUserRoute.getMiddlewares = () => [AuthenticateMiddleware(dependencies.jsonwebtokenClient)];
  
  return [createUserRoute, authUserRoute, changePasswordUserRoute];
}

function startServer(): void {
  const dependencies = createDependencies();
  const routes = configurationRoutes(dependencies);

  const api = ApiExpress.create(routes);
  const port = 8080;
  api.start(port);
}

startServer();
