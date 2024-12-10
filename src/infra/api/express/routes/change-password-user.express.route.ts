import { NextFunction, Request, Response } from "express";

import { IJsonWebTokenGatewayProvider } from "@domain/gateway/providers/jsonwebtoken.gateway.provider";
import { ChangePasswordDTO, ChangePasswordResponseDTO } from "@domain/gateway/repositories/user.gateway.repository";

import { ChangePasswordUserUsecase } from "@usecases/change-password-user/change-password-user.usecase";

import CleanBearerToken from "@utils/CleanBearerToken";

import { HttpMethod, Route } from "..";


export type ChangePasswordUserResponseDto = {}

export class ChangePasswordUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly changePasswordUserService: ChangePasswordUserUsecase,
        private readonly jsonwebtokenClient: IJsonWebTokenGatewayProvider,
    ) { }

    public static create(changePasswordUserService: ChangePasswordUserUsecase, jsonwebtokenClient: IJsonWebTokenGatewayProvider) {
        return new ChangePasswordUserRoute(
            "/change-password",
            HttpMethod.POST,
            changePasswordUserService,
            jsonwebtokenClient,
        );
    }

    public getMiddleware(): (request: Request, response: Response, next: NextFunction) => void {
        const verify = this.jsonwebtokenClient.verify;

        return function (request: Request, response: Response, next: NextFunction) {
            const bearerToken = request.headers["authorization"];
            if (!bearerToken) {
                return response.status(401).json({ message: "Unauthorized" });
            }
            const token = CleanBearerToken.create(bearerToken).getToken();

            const verifiedToken = verify(token, process.env.JWT_SECRET, {});

            if (!verifiedToken?.email) {
                return response.status(401).json({ message: "Unauthorized" });
            }
            response.locals.userEmail = verifiedToken?.email;
            next();
        };
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
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
                response.status(400).json({ message: error.message });
            }

        };
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }
}