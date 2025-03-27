import { AWSSecretsManager } from "@scalify/shared-microservice";

import { Argon2Provider } from "@infrastructure/providers/encrypt/argon2.provider";

import { ApiExpress } from "@main/api/express/api.express";
import { StatusRoute } from "@main/api/express/routes/status.express.route";
import { CreateUserFactory } from "@main/factories/create.factory";
import { UserRepositoryFactory } from "@main/factories/repository.factory";

async function start(): Promise<void> {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      "JWT_SECRET": "jwt/production/scalableecommerce",
      "POSTGRESDB_URL": "postgresdb/production/scalableecommerce",
      "RABBITMQ_URL": "rabbitmq/production/scalableecommerce",
    },
  });
  const encryptProvider = Argon2Provider.create();
  const userRepository = UserRepositoryFactory.create();

  // const jsonwebtokenProvider = JsonWebTokenProvider.create();
  // const ampqProvider = AmpqProvider.create(process.env.RABBITMQ_URL);

  // ampqProvider.connect();

  const createUserRoute = CreateUserFactory.create(userRepository, encryptProvider);

  const api = ApiExpress.create([
    createUserRoute,
    StatusRoute.create(),
  ]);

  api.start(3000);
}

start();