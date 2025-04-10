import { GetUserUsecase } from "@application/usecases/get-user.usecase";
import {
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "@main/api/express/routes/interfaces/route.interface";

export class GetUserController {
  private constructor(private readonly getUserUseCase: GetUserUsecase) {}

  public static create(getUserUseCase: GetUserUsecase) {
    return new GetUserController(getUserUseCase);
  }

  public execute = async (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => {
    try {
      const { id } = request.params;
      if (!id) {
        throw new Error("Empty Id");
      }
      const output = await this.getUserUseCase.execute(id);
      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
