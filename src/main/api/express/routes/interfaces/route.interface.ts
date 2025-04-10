import { NextFunction, Request, Response } from "express";

// ToDo: Rename HttpMethod to I or T (IHttpMethod or TIHttpMethod)
export type HttpMethod = "get" | "post";
export const HttpMethod = {
  GET: "get" as HttpMethod,
  POST: "post" as HttpMethod,
} as const;

export type TExpressRequest = Request;
export type TExpressResponse = Response;
export type TExpressNext = NextFunction;

export interface IRoute {
  getHandler(): (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void>;
  getPath(): string;
  getMethod(): HttpMethod;
  getMiddlewares(): Middlewares[];
};


