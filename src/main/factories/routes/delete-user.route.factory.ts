import { UpdateUserUsecase } from "@application/usecases/update-user/update-user.usecase";

import { UpdateUserController } from "@infrastructure/controllers/update-user.controller";
import { UserRepository } from "@infrastructure/repositories/user.repository";

import { DeleteUserRoute } from "@main/api/express/routes/delete-user.express.route";

export class DeleteUserRouteFactory {
  public static create(userRepository: UserRepository) {
    return DeleteUserRoute.create(
      UpdateUserController.create(UpdateUserUsecase.create(userRepository)),
    );
  }
}
