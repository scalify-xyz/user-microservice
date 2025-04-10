import { CreateUserController } from "@infrastructure/controllers/create-user.controller";

import { HttpMethod, IRoute, TExpressNext, TExpressRequest, TExpressResponse } from "./interfaces/route.interface";

export class CreateUserRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserController: CreateUserController,
  ) {}

  public static create(createUserController: CreateUserController) {
    return new CreateUserRoute("/user", HttpMethod.POST, createUserController);
  }

  public getHandler(): (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => Promise<void> {
    return this.createUserController.execute;
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
