import { NextFunction, Request, Response } from "express";

import { HttpMethod, Route } from "../../../interfaces/api/route.interface";

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
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                const output = {
                    status: 200,
                };
                response.status(201).json(output);
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