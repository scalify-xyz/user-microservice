import { GetUserUsecase } from "@application/usecases/get-user.usecase";

import { GetUserController } from "@infrastructure/controllers/get-user.controller";
import { UserRepository } from "@infrastructure/repositories/user.repository";

import { GetUserRoute } from "@main/api/express/routes/get-user.express.route";

export class UpdateUserRouteFactory {
  public static create(userRepository: UserRepository) {
    return GetUserRoute.create(
      GetUserController.create(GetUserUsecase.create(userRepository)),
    );
  }
}
