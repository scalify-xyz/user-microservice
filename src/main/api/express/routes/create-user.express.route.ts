import { NextFunction, Request, Response } from "express";

import { CreateUserController } from "@infrastructure/controllers/create-user.controller";

import { HttpMethod, Route } from "./interfaces/route.interface";

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserController: CreateUserController,
    ) { }

    public static create(createUserController: CreateUserController) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserController,
        );
    }

    public getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return this.createUserController.execute;
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