
import { User } from "@domain/entity/user.entity";
import { IUserRepository, SaveDTO, SaveResponseDTO } from "@domain/interfaces/repositories/user.interface.repository";

import { UseCase } from "@application/interfaces/usecase.interface";

import { IRabbitMQProvider } from "@infrastructure/interfaces/providers/rabbitmq.interface.provider";

import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";


export class CreateUsecase implements UseCase<SaveDTO, SaveResponseDTO> {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly ampqProvider: IRabbitMQProvider,
    ) { }

    public static create(userRepository: IUserRepository, ampqProvider: IRabbitMQProvider) {
        return new CreateUsecase(userRepository, ampqProvider);
    }

    public async execute({ name, email, password }: SaveDTO): Promise<SaveResponseDTO> {
        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        const user = User.create({ name, email, password });


        const output: SaveResponseDTO = await this.userRepository.save(user);
    
        await this.ampqProvider.publish(RABBITMQ_USER_CREATED_QUEUE_NAME, { id: output.id, name, email });

        return output;
    }
}