import { AuthUsecase } from "@application/usecases/auth/auth.usecase";
import { CreateUsecase } from "@application/usecases/create/create.usecase";
import { UpdatePasswordUsecase } from "@application/usecases/update-password/update-password.usecase";

import { ApiExpress } from "@infra/api/express/api.express";
import { AuthUserRoute } from "@infra/api/express/routes/auth-user.express.route";
import { ChangePasswordUserRoute } from "@infra/api/express/routes/change-password-user.express.route";
import { CreateUserRoute } from "@infra/api/express/routes/create-user.express.route";
import { StatusRoute } from "@infra/api/express/routes/status.express.route";
import { AmpqProvider } from "@infra/providers/ampq.provider";
import { Argon2Provider } from "@infra/providers/argon2.provider";
import { JsonWebTokenProvider } from "@infra/providers/jsonwebtoken.provider";
import { PrismaProvider } from "@infra/providers/prisma.provider";
import { UserRepositoryPrisma } from "@infra/repositories/prisma/user.repository.prisma";

import { AuthenticationMiddleware } from "@shared/middlewares/authentication.middleware";
import AWSSecretsManager from "@shared/utils/aws-secrets-manager";

async function start(): Promise<void> {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      "JWT_SECRET": "jwt/production/scalableecommerce",
      "POSTGRESDB_URL": "postgresdb/production/scalableecommerce",
      "RABBITMQ_URL": "rabbitmq/production/scalableecommerce",
    },
  });

  const prismaProvider = PrismaProvider.create();
  const encryptProvider = Argon2Provider.create();
  const jsonwebtokenProvider = JsonWebTokenProvider.create();

  const ampqProvider = AmpqProvider.create(process.env.RABBITMQ_URL);
  ampqProvider.connect();


  const userRepository = UserRepositoryPrisma.create(prismaProvider, encryptProvider);

  const createUsecase = CreateUsecase.create(userRepository, ampqProvider);
  const authUsecase = AuthUsecase.create(userRepository, encryptProvider, jsonwebtokenProvider);
  const updatePasswordUsecase = UpdatePasswordUsecase.create(userRepository, encryptProvider);

  const createUserRoute = CreateUserRoute.create(createUsecase);
  const authUserRoute = AuthUserRoute.create(authUsecase);
  const changePasswordUserRoute = ChangePasswordUserRoute.create(updatePasswordUsecase);
  const statusRoute = StatusRoute.create();

  changePasswordUserRoute.addMiddleware(AuthenticationMiddleware(jsonwebtokenProvider));

  const api = ApiExpress.create([createUserRoute, authUserRoute, changePasswordUserRoute, statusRoute]);
  const port = 3000;
  api.start(port);
}

start();