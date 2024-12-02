import { Request, Response } from "express";
import { HttpMethod, Route } from "..";
import { AuthUserInputDto, AuthUserOutputDto, AuthUserUsecase } from "../../../../usecases/auth-user/auth-user.usecase";

export type AuthUserResponseDto = {
    jwt: string;
}

export class AuthUserRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly authUser: AuthUserUsecase,
    ) { }

    public static create(authUser: AuthUserUsecase) {
        return new AuthUserRoute(
            "/login",
            HttpMethod.POST,
            authUser
        )
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            try {
                const { email, password } = request.body;

                const input: AuthUserInputDto = {
                    email,
                    password
                }

                const output: AuthUserOutputDto = await this.authUser.execute(input);

                response.status(201).json(output)
            } catch (error) {
                response.status(400).json({ message: error.message })
            }

        }
    }

    getPath(): string {
        return this.path;
    }

    getMethod(): HttpMethod {
        return this.method;
    }
}