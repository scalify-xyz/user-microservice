import { User } from "@domain/entity/user.entity";
import { IUserGatewayRepository, SaveDTO, SaveResponseDTO } from "@domain/gateway/repositories/user.gateway.repository";

import { UseCase } from "@usecases/index";

export class CreateUserUsecase implements UseCase<SaveDTO, SaveResponseDTO> {
    private constructor(private readonly userRepository: IUserGatewayRepository) { }

    public static create(userRepository: IUserGatewayRepository) {
        return new CreateUserUsecase(userRepository);
    }

    public async execute({ name, email, password }: SaveDTO): Promise<SaveResponseDTO> {
        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        const user = User.create(name, email, password);


        const output: SaveResponseDTO = await this.userRepository.save(user);

        return output;
    }
}