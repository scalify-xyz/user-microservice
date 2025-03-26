import { CreateUserUsecase } from "@application/usecases/create.usecase";

import { CreateUserController } from "@infrastructure/controllers/create.controller";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { CreateUserRoute } from "@main/api/express/routes/create.express.route";

export class CreateUserFactory {
    static create(userRepository: UserRepository) {
        const usecase = CreateUserUsecase.create(userRepository);
        const controller = CreateUserController.create(usecase);
        return CreateUserRoute.create(controller);
    }
}
