import { NextFunction, Request, Response } from "express";

import { GetUserController } from "@infrastructure/controllers/get-user.controller";

import { HttpMethod, Route } from "./interfaces/route.interface";

export class GetUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getUserController: GetUserController,
  ) {}

  public static create(getUserController: GetUserController) {
    return new GetUserRoute("/user/:id", HttpMethod.GET, getUserController);
  }

  public getHandler(): (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void> {
    return this.getUserController.execute;
  }

  public getPath(): string {
    return this.path;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public getMiddlewares(): Middlewares[] {
    return [];
  }
}
