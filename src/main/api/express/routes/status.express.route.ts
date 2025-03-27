import { NextFunction, Request, Response } from "express";

import { HttpMethod, Route } from "./interfaces/route.interface";

export type CreateUserResponseDto = {
    id: string;
}

export class StatusRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
    ) { }

    public static create() {
        return new StatusRoute(
            "/status",
            HttpMethod.GET,
        );
    }

    public getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (_: Request, response: Response, next: NextFunction) => {
            try {
                response.status(200).json({
                    status: 200,
                });
            } catch (error) {
                next(error);
            }

        };
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }

    getMiddlewares(): Middlewares[] {
        return [];
    }
}