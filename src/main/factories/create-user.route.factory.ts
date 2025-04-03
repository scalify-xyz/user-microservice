import { RabbitMQProvider } from "@scalify/shared-microservice";

import { CreateUserUsecase } from "@application/usecases/create-user/create.usecase";

import { CreateUserController } from "@infrastructure/controllers/create-user.controller";
import { Argon2Provider } from "@infrastructure/providers/argon2.provider";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { CreateUserRoute } from "@main/api/express/routes/create-user.express.route";

export class CreateUserRouteFactory {
    static create(
        userRepository: UserRepository,
        encryptProvider: Argon2Provider,
        rabbitMqProvider: RabbitMQProvider,
    ) {
        return CreateUserRoute.create(
            CreateUserController.create(
                CreateUserUsecase.create(userRepository),
                encryptProvider,
                rabbitMqProvider,
            ),
        );
    }
}
