import { ListUserUsecase } from "@application/usecases/list-user.usecase";

import {
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "@main/api/express/routes/interfaces/route.interface";

export class ListUserController {
  private constructor(private readonly listUserUseCase: ListUserUsecase) {}

  public static create(listUserUseCase: ListUserUsecase) {
    return new ListUserController(listUserUseCase);
  }

  public execute = async (
    _: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => {
    try {
      const output = await this.listUserUseCase.execute();
      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
