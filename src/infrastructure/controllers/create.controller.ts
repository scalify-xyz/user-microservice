import { NextFunction, Request, Response } from "express";

import { CreateUserUsecase } from "@application/usecases/create.usecase";

import { SaveDTO, SaveResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";


export class CreateUserController {
    private constructor(
        private readonly createUserUseCase: CreateUserUsecase,
    ) { }

    public static create(createUserUseCase: CreateUserUsecase) {
        return new CreateUserController(createUserUseCase);
    }

    public async execute(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, email, password } = request.body;

            const input: SaveDTO = {
                name,
                email,
                password,
            };
            console.log(input);

            // const output: SaveResponseDTO = await this.createUserUseCase.execute(input);

            response.status(201).json(input);
        } catch (error) {
            next(error);
        }

    }
}