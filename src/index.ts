import { AWSSecretsManager, RabbitMQProvider } from "@scalify/shared-microservice";

import { Argon2Provider } from "@infrastructure/providers/argon2.provider";

import { ApiExpress } from "@main/api/express/api.express";
import { StatusRoute } from "@main/api/express/routes/status.express.route";
import { CreateUserRouteFactory } from "@main/factories/create-user.route.factory";
import { ListUserRouteFactory } from "@main/factories/list-user.route.factory";
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

  const userRepository = UserRepositoryFactory.create();
  const encryptProvider = Argon2Provider.create();
  const rabbitMqProvider = await RabbitMQProvider.create(process.env.RABBITMQ_URL);

  const createUserRoute = CreateUserRouteFactory.create(
    userRepository,
    encryptProvider,
    rabbitMqProvider,
  );
  
  const listUserRoute = ListUserRouteFactory.create(userRepository);
  

  const api = ApiExpress.create([
    createUserRoute,
    listUserRoute,
    StatusRoute.create(),
  ]);

  api.start(3000);
}

start();