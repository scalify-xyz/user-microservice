import { ListUserUsecase } from "@application/usecases/list-user.usecase";

import { ListUserController } from "@infrastructure/controllers/list-user.controller";
import { UserRepository } from "@infrastructure/repositories/user.repository";

import { ListUserRoute } from "@main/api/express/routes/list-user.express.route";

export class ListUserRouteFactory {
  public static create(userRepository: UserRepository) {
    return ListUserRoute.create(
      ListUserController.create(ListUserUsecase.create(userRepository)),
    );
  }
}
