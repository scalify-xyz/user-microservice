import { NextFunction, Request, Response } from "express";

import { ListUserUsecase } from "@application/usecases/list-user.usecase";

export class ListUserController {
  private constructor(private readonly listUserUseCase: ListUserUsecase) {}

  public static create(listUserUseCase: ListUserUsecase) {
    return new ListUserController(listUserUseCase);
  }

  public execute = async (
    _: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const output = await this.listUserUseCase.execute();
      response.status(201).json(output);
    } catch (error) {
      next(error);
    }
  };
}
