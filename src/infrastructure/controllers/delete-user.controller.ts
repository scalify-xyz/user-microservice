import { DeleteUserUsecase } from "@application/usecases/delete-user.usecase";

import {
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "@main/api/express/routes/interfaces/route.interface";

export class DeleteUserController {
  private constructor(private readonly deleteUserUseCase: DeleteUserUsecase) {}

  public static create(deleteUserUseCase: DeleteUserUsecase) {
    return new DeleteUserController(deleteUserUseCase);
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
      const output = await this.deleteUserUseCase.execute(id);
      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
