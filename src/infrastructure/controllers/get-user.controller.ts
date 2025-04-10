import { NextFunction, Request, Response } from "express";

import { GetUserUsecase } from "@application/usecases/get-user.usecase";

export class GetUserController {
  private constructor(private readonly getUserUseCase: GetUserUsecase) {}

  public static create(getUserUseCase: GetUserUsecase) {
    return new GetUserController(getUserUseCase);
  }

  public execute = async (
    req: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new Error("Empty Id");
      }
      const output = await this.getUserUseCase.execute(id);
      console.log(output);

      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
