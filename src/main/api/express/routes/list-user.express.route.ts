import { NextFunction, Request, Response } from "express";

import { ListUserController } from "@infrastructure/controllers/list-user.controller";

import { HttpMethod, Route } from "./interfaces/route.interface";

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserController: ListUserController,
  ) {}

  public static create(listUserController: ListUserController) {
    return new ListUserRoute("/user", HttpMethod.GET, listUserController);
  }

  public getHandler(): (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void> {
    return this.listUserController.execute;
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
