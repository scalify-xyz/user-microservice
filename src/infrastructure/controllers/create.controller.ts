import { RabbitMQProvider } from "@scalify/shared-microservice";

import { NextFunction, Request, Response } from "express";

import { CreateUserUsecase } from "@application/usecases/create.usecase";

import { Argon2Provider } from "@infrastructure/providers/encrypt/argon2.provider";
import { SaveDTO, SaveResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";


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

            const input: SaveDTO = {
                name,
                email,
                password: await this.encryptProvider.hash(password),
            };

            const output: SaveResponseDTO = await this.createUserUseCase.execute(input);
            
            this.rabbitMqProvider.publish(
                RABBITMQ_USER_CREATED_QUEUE_NAME,
                { status: "200" },
            );

            response.status(201).json(output);
        } catch (error) {
            next(error);
        }
    };
}