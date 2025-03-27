import { RabbitMQProvider } from "@scalify/shared-microservice";

import { NextFunction, Request, Response } from "express";

import { CreateUserDTO, CreateUserResponseDTO } from "@application/usecases/create-user/create.schema";
import { CreateUserUsecase } from "@application/usecases/create-user/create.usecase";

import { Argon2Provider } from "@infrastructure/providers/encrypt/argon2.provider";

const RABBITMQ_QUEUE_NAME = "notifications";

export class CreateUserController {
    private constructor(
        private readonly createUserUseCase: CreateUserUsecase,
        private readonly encryptProvider: Argon2Provider,
        private readonly rabbitMqProvider: RabbitMQProvider,
    ) { }

    public static create(
        createUserUseCase: CreateUserUsecase,
        encryptProvider: Argon2Provider,
        rabbitMqProvider: RabbitMQProvider,
    ) {
        return new CreateUserController(
            createUserUseCase,
            encryptProvider,
            rabbitMqProvider,
        );
    }

    public execute = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { name, email, password } = request.body;

            const input: CreateUserDTO = {
                name,
                email,
                password: await this.encryptProvider.hash(password),
            };

            const output: CreateUserResponseDTO = await this.createUserUseCase.execute(input);

            this.rabbitMqProvider.publish(
                RABBITMQ_QUEUE_NAME,
                {
                    message: "USER_CREATE",
                    provider: "email",
                    userId: output.id,
                },
            );

            response.status(201).json(output);
        } catch (error) {
            next(error);
        }
    };
}