import { UpdateUserUsecase } from "@application/usecases/update-user/update-user.usecase";

import { UpdateUserController } from "@infrastructure/controllers/update-user.controller";
import { UserRepository } from "@infrastructure/repositories/user.repository";

import { UpdateUserRoute } from "@main/api/express/routes/update-user.express.route";

export class UpdateUserRouteFactory {
  public static create(userRepository: UserRepository) {
    return UpdateUserRoute.create(
      UpdateUserController.create(UpdateUserUsecase.create(userRepository)),
    );
  }
}
