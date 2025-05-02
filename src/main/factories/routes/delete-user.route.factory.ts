import { UpdateUserUsecase } from "@application/usecases/update-user/update-user.usecase";

import { DeleteUserController } from "@infrastructure/controllers/delete-user.controller";
import { UserRepository } from "@infrastructure/repositories/user.repository";

import { DeleteUserRoute } from "@main/api/express/routes/delete-user.express.route";

export class DeleteUserRouteFactory {
  public static create(userRepository: UserRepository) {
    return DeleteUserRoute.create(
      DeleteUserController.create(UpdateUserUsecase.create(userRepository)),
    );
  }
}
