import { CreateUserUsecase } from "@application/usecases/create-user/create.usecase";

import { CreateUserController } from "@infrastructure/controllers/create-user.controller";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { CreateUserRoute } from "@main/api/express/routes/create-user.express.route";

export class ListUserRouteFactory {
    static create(
        userRepository: UserRepository,
    ) {
        // return CreateUserRoute.create(
            // CreateUserController.create(
            //     CreateUserUsecase.create(userRepository),
            // ),
        // );
    }
}
