import { NextFunction, Request, Response } from "express";

export type HttpMethod = "get" | "post";

export const HttpMethod = {
    GET: "get" as HttpMethod,
    POST: "post" as HttpMethod,
} as const;

export type Route = {
    getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void>;
    getPath(): string;
    getMethod(): HttpMethod;
    getMiddlewares(): Middlewares[];
}