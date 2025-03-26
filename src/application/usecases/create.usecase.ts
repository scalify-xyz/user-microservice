
import { User } from "@domain/entity/user.entity";

import { IRabbitMQProvider } from "@infrastructure/providers/interfaces/rabbitmq.interface.provider";
import { IUserRepository, SaveDTO, SaveResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";


import { RABBITMQ_USER_CREATED_QUEUE_NAME } from "@shared/constants/rabbit-mq.constants";


export class CreateUserUsecase {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly ampqProvider: IRabbitMQProvider,
    ) { }

    public static create(userRepository: IUserRepository, ampqProvider: IRabbitMQProvider) {
        return new CreateUserUsecase(userRepository, ampqProvider);
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