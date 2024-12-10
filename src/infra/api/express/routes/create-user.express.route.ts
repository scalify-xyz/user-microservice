import { NextFunction, Request, Response } from "express";

import { SaveDTO, SaveResponseDTO } from "@domain/gateway/repositories/user.gateway.repository";

import { CreateUserUsecase } from "@usecases/create-user/create-user.usecase";

import { HttpMethod, Route } from "..";

export type CreateUserResponseDto = {
    id: string;
}

export class CreateUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createUserService: CreateUserUsecase,
    ) { }

    public static create(createUserService: CreateUserUsecase) {
        return new CreateUserRoute(
            "/user",
            HttpMethod.POST,
            createUserService,
        );
    }

    public getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                const { name, email, password } = request.body;

                const input: SaveDTO = {
                    name,
                    email,
                    password,
                };

                const output: SaveResponseDTO = await this.createUserService.execute(input);

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