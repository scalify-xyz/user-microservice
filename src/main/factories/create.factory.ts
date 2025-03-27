import { RabbitMQProvider } from "@scalify/shared-microservice";

import { CreateUserUsecase } from "@application/usecases/create.usecase";

import { CreateUserController } from "@infrastructure/controllers/create.controller";
import { Argon2Provider } from "@infrastructure/providers/encrypt/argon2.provider";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { CreateUserRoute } from "@main/api/express/routes/create.express.route";

export class CreateUserFactory {
    static create(
        userRepository: UserRepository,
        encryptProvider: Argon2Provider,
        rabbitMqProvider: RabbitMQProvider,
    ) {
        const usecase = CreateUserUsecase.create(userRepository);
        const controller = CreateUserController.create(
            usecase,
            encryptProvider,
            rabbitMqProvider,
        );
        return CreateUserRoute.create(controller);
    }
}
