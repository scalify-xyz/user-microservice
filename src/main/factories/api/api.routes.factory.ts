import { RabbitMQProvider } from "@scalify/shared-microservice";

import { Argon2Provider } from "@infrastructure/providers/argon2.provider";

import { IRoute } from "@main/api/express/routes/interfaces/route.interface";
import { StatusRoute } from "@main/api/express/routes/status.express.route";
import { UserRepositoryFactory } from "@main/factories/repositories/repository.factory";
import { CreateUserRouteFactory } from "@main/factories/routes/create-user.route.factory";
import { GetUserRouteFactory } from "@main/factories/routes/get-user.route.factory";
import { ListUserRouteFactory } from "@main/factories/routes/list-user.route.factory";

export class ApiRoutesFactory {
  public static async create(): Promise<IRoute[]> {
    const userRepository = UserRepositoryFactory.create();
    const encryptProvider = Argon2Provider.create();
    const rabbitMqProvider = await RabbitMQProvider.create(
      process.env.RABBITMQ_URL,
    );

    const createUserRoute = CreateUserRouteFactory.create(
      userRepository,
      encryptProvider,
      rabbitMqProvider,
    );
    const listUserRoute = ListUserRouteFactory.create(userRepository);
    const getUserRoute = GetUserRouteFactory.create(userRepository);
    const statusRoute = StatusRoute.create();

    return [createUserRoute, listUserRoute, getUserRoute, statusRoute];
  }
}
