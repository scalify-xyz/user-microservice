import { NextFunction, Request, Response } from "express";

import { IJsonWebTokenGatewayProvider } from "@domain/gateway/providers/jsonwebtoken.gateway.provider";
import { ChangePasswordDTO, ChangePasswordResponseDTO } from "@domain/gateway/repositories/user.gateway.repository";

import { ChangePasswordUserUsecase } from "@usecases/change-password-user/change-password-user.usecase";

import { HttpMethod, Route } from "..";

export type ChangePasswordUserResponseDto = {}

export class ChangePasswordUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly changePasswordUserService: ChangePasswordUserUsecase,
    ) { }

    public static create(changePasswordUserService: ChangePasswordUserUsecase) {
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
        return [];
    }
}