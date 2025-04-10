import { GetUserController } from "@infrastructure/controllers/get-user.controller";

import {
  HttpMethod,
  IRoute,
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "./interfaces/route.interface";

export class GetUserRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly getUserController: GetUserController,
  ) {}

  public static create(getUserController: GetUserController) {
    return new GetUserRoute("/user/:id", HttpMethod.GET, getUserController);
  }

  public getHandler(): (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
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
