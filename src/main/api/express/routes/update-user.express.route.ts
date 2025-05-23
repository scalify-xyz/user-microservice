import { UpdateUserController } from "@infrastructure/controllers/update-user.controller";

import {
  HttpMethod,
  IRoute,
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "./interfaces/route.interface";

export class UpdateUserRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly updateUserController: UpdateUserController,
  ) {}

  public static create(updateUserController: UpdateUserController) {
    return new UpdateUserRoute(
      "/user/:id",
      HttpMethod.PATCH,
      updateUserController,
    );
  }

  public getHandler(): (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => Promise<void> {
    return this.updateUserController.execute;
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
