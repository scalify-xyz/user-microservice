import { UpdateUserUsecase } from "@application/usecases/update-user/update-user.usecase";

import {
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "@main/api/express/routes/interfaces/route.interface";

export class UpdateUserController {
  private constructor(private readonly updateUserUseCase: UpdateUserUsecase) {}

  public static create(updateUserUseCase: UpdateUserUsecase) {
    return new UpdateUserController(updateUserUseCase);
  }

  public execute = async (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => {
    try {
      const { id } = request.params;
      const { name, email, password } = request.body;

      if (!id) {
        throw new Error("Empty Id");
      }
      const output = await this.updateUserUseCase.execute(id, {
        name,
        email,
        password,
      });
      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
