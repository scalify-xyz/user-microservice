import { ListUserUsecase } from "@application/usecases/list-user.usecase";

import { ListUserController } from "@infrastructure/controllers/list-user.controller";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { ListUserRoute } from "@main/api/express/routes/list-user.express.route";

export class ListUserRouteFactory {
  static create(userRepository: UserRepository) {
    return ListUserRoute.create(
      ListUserController.create(ListUserUsecase.create(userRepository)),
    );
  }
}
