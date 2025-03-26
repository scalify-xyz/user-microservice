import { NextFunction, Request, Response } from "express";

import { ChangePasswordDTO, ChangePasswordResponseDTO } from "@domain/interfaces/repositories/user.interface.repository";

import { UpdatePasswordUsecase } from "@application/usecases/update-password.usecase";

import { HttpMethod, Route } from "../../../interfaces/api/route.interface";

export type ChangePasswordUserResponseDto = {}

export class ChangePasswordUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly changePasswordUserService: UpdatePasswordUsecase,
        private readonly middlewares?: Middlewares[],
    ) {
        this.middlewares = [];
     }

    public static create(changePasswordUserService: UpdatePasswordUsecase) {
        return new ChangePasswordUserRoute(
            "/change-password",
            HttpMethod.POST,
            changePasswordUserService,
        );
    }

    public getHandler(): (request: Request, response: Response, next: NextFunction) => Promise<void> {
        return async (request: Request, response: Response, next: NextFunction) => {
            try {
                const userEmail = response.locals.userEmail as string;
                const { password, email } = request.body;

                if (userEmail !== email) {
                    throw new Error("Authentication failure");
                }

                const input: ChangePasswordDTO = { password, email: userEmail };
                const output: ChangePasswordResponseDTO = await this.changePasswordUserService.execute(input);

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
        return this.middlewares;
    }

    addMiddleware(middleware: Middlewares) {
        this.middlewares.push(middleware);
        return this;
    }
}