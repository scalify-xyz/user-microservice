import { UseCase } from "src/application/interfaces/usecase.interface";

import { User } from "@domain/entity/user.entity";
import { IUserRepository, SaveDTO, SaveResponseDTO } from "@domain/interfaces/repositories/user.interface.repository";


export class CreateUsecase implements UseCase<SaveDTO, SaveResponseDTO> {
    private constructor(private readonly userRepository: IUserRepository) { }

    public static create(userRepository: IUserRepository) {
        return new CreateUsecase(userRepository);
    }

    public async execute({ name, email, password }: SaveDTO): Promise<SaveResponseDTO> {
        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        const user = User.create({ name, email, password });


        const output: SaveResponseDTO = await this.userRepository.save(user);

        return output;
    }
}