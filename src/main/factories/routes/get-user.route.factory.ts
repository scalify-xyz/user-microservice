
import { GetUserUsecase } from "@application/usecases/get-user.usecase";

import { GetUserController } from "@infrastructure/controllers/get-user.controller";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { AddUserRoute } from "@main/api/express/routes/get-user.express.route";

export class GetUserRouteFactory {
    static create(
        userRepository: UserRepository,
    ) {
        return AddUserRoute.create(
            GetUserController.create(
                GetUserUsecase.create(userRepository),
            ),
        );
    }
}
