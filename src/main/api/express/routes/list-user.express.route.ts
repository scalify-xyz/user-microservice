import { ListUserController } from "@infrastructure/controllers/list-user.controller";

import { HttpMethod, IRoute, TExpressNext, TExpressRequest, TExpressResponse } from "./interfaces/route.interface";

export class ListUserRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listUserController: ListUserController,
  ) {}

  public static create(listUserController: ListUserController) {
    return new ListUserRoute("/user", HttpMethod.GET, listUserController);
  }

  public getHandler(): (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
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
