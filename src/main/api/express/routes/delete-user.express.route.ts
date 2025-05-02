import { DeleteUserController } from "@infrastructure/controllers/delete-user.controller";

import {
  HttpMethod,
  IRoute,
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "./interfaces/route.interface";

export class DeleteUserRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly deleteUserController: DeleteUserController,
  ) {}

  public static create(deleteUserController: DeleteUserController) {
    return new DeleteUserRoute(
      "/user/:id",
      HttpMethod.DELETE,
      deleteUserController,
    );
  }

  public getHandler(): (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => Promise<void> {
    return this.deleteUserController.execute;
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
