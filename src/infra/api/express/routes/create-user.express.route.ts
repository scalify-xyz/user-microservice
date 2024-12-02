import { Request, Response } from "express";
import { HttpMethod, Route } from "..";
import { CreateUserInputDto, CreateUserOutputDto, CreateUserUsecase } from "../../../../usecases/create-user/create-user.usecase";

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
            "/users",
            HttpMethod.POST,
            createUserService
        )
    }

    public getHandler(): (request: Request, response: Response) => Promise<void> {
        return async (request: Request, response: Response) => {
            try {
                const { name, email, password } = request.body;

                const input: CreateUserInputDto = {
                    name,
                    email,
                    password
                }

                const output: CreateUserOutputDto = await this.createUserService.execute(input);

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