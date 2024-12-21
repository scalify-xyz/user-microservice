import { AuthUserUsecase } from "src/application/usecases/auth-user/auth-user.usecase";
import { UpdatePasswordUserUsecase } from "src/application/usecases/change-password-user/change-password-user.usecase";
import { CreateUserUsecase } from "src/application/usecases/create-user/create-user.usecase";

import { ApiExpress } from "@infra/api/express/api.express";
import { AuthUserRoute } from "@infra/api/express/routes/auth-user.express.route";
import { ChangePasswordUserRoute } from "@infra/api/express/routes/change-password-user.express.route";
import { CreateUserRoute } from "@infra/api/express/routes/create-user.express.route";
import { Argon2Provider } from "@infra/providers/argon2.provider";
import { JsonWebTokenProvider } from "@infra/providers/jsonwebtoken.provider";
import { PrismaProvider } from "@infra/providers/prisma.provider";
import { UserRepositoryPrisma } from "@infra/repositories/prisma/user.repository.prisma";

import { AuthenticationMiddleware } from "@shared/middlewares/authentication.middleware";

function start(): void {
  const prismaProvider = PrismaProvider.create();
  const encryptProvider = Argon2Provider.create();
  const jsonwebtokenProvider = JsonWebTokenProvider.create();

  const userRepository = UserRepositoryPrisma.create(prismaProvider, encryptProvider);

  const createUserUsecase = CreateUserUsecase.create(userRepository);
  const authUserUsecase = AuthUserUsecase.create(userRepository, encryptProvider, jsonwebtokenProvider);
  const updatePasswordUserUsecase = UpdatePasswordUserUsecase.create(userRepository, encryptProvider);

  const createUserRoute = CreateUserRoute.create(createUserUsecase);
  const authUserRoute = AuthUserRoute.create(authUserUsecase);
  const changePasswordUserRoute = ChangePasswordUserRoute.create(updatePasswordUserUsecase);

  changePasswordUserRoute.addMiddleware(AuthenticationMiddleware(jsonwebtokenProvider));

  const api = ApiExpress.create([createUserRoute, authUserRoute, changePasswordUserRoute]);
  const port = 8080;
  api.start(port);
}

start();
