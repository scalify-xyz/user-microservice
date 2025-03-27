import { NextFunction, Request, Response } from "express";

import { CreateUserUsecase } from "@application/usecases/create.usecase";

import { Argon2Provider } from "@infrastructure/providers/encrypt/argon2.provider";
import { SaveDTO, SaveResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";


export class CreateUserController {
    private constructor(
        private readonly createUserUseCase: CreateUserUsecase,
        private readonly encryptProvider: Argon2Provider,
    ) { }

    public static create(
        createUserUseCase: CreateUserUsecase,
        encryptProvider: Argon2Provider,
    ) {
        return new CreateUserController(createUserUseCase, encryptProvider);
    }

    public execute = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { name, email, password } = request.body;

            const input: SaveDTO = {
                name,
                email,
                password: await this.encryptProvider.hash(password),
            };

            const output: SaveResponseDTO = await this.createUserUseCase.execute(input);

            response.status(201).json(output);
        } catch (error) {
            next(error);
        }
    };
}