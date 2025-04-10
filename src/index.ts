import { AWSSecretsManager, RabbitMQProvider } from "@scalify/shared-microservice";

import { Argon2Provider } from "@infrastructure/providers/argon2.provider";

import { ApiExpress } from "@main/api/express/api.express";
import { StatusRoute } from "@main/api/express/routes/status.express.route";
import { UserRepositoryFactory } from "@main/factories/repositories/repository.factory";
import { CreateUserRouteFactory } from "@main/factories/routes/create-user.route.factory";
import { GetUserRouteFactory } from "@main/factories/routes/get-user.route.factory";
import { ListUserRouteFactory } from "@main/factories/routes/list-user.route.factory";

async function start(): Promise<void> {
  await AWSSecretsManager.create({
    region: "sa-east-1",
    secretsMap: {
      "JWT_SECRET": "jwt/production/scalableecommerce",
      "POSTGRESDB_URL": "postgresdb/production/scalableecommerce",
      "RABBITMQ_URL": "rabbitmq/production/scalableecommerce",
    },
  });

  const userRepository = UserRepositoryFactory.create();
  const encryptProvider = Argon2Provider.create();
  const rabbitMqProvider = await RabbitMQProvider.create(process.env.RABBITMQ_URL);

  const createUserRoute = CreateUserRouteFactory.create(
    userRepository,
    encryptProvider,
    rabbitMqProvider,
  );
  
  const listUserRoute = ListUserRouteFactory.create(userRepository);

  const getUserRoute = GetUserRouteFactory.create(userRepository);

  const api = ApiExpress.create([
    createUserRoute,
    listUserRoute,
    getUserRoute,
    StatusRoute.create(),
  ]);

  api.start(3000);
}

start();