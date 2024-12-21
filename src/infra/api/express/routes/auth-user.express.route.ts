import { NextFunction, Request, Response } from "express";

import { AuthUsecase } from "src/application/usecases/auth/auth.usecase";

import { LoginDTO, LoginResponseDTO } from "@domain/interfaces/repositories/user.interface.repository";


import { HttpMethod, Route } from "../../../interfaces/api/route.interface";

export type AuthUserResponseDto = {
    token: string;
}

export class AuthUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authUserService: AuthUsecase,
    ) { }

    public static create(authUserService: AuthUsecase) {
        return new AuthUserRoute(
            "/login",
            HttpMethod.POST,
            authUserService,
        );
    }

    public getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                const { email, password } = request.body;

                const input: LoginDTO = {
                    email,
                    password,
                };

                const output: LoginResponseDTO = await this.authUserService.execute(input);

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