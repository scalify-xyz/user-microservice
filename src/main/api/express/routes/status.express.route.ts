import {
  HttpMethod,
  IRoute,
  TExpressNext,
  TExpressRequest,
  TExpressResponse,
} from "./interfaces/route.interface";

export class StatusRoute implements IRoute {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
  ) {}

  public static create() {
    return new StatusRoute("/status", HttpMethod.GET);
  }

  public getHandler(): (
    request: TExpressRequest,
    response: TExpressResponse,
    next: TExpressNext,
  ) => Promise<void> {
    return async (
      _: TExpressRequest,
      response: TExpressResponse,
      next: TExpressNext,
    ) => {
      try {
        response.status(200).json({
          status: 200,
        });
      } catch (error) {
        next(error);
      }
    };
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
