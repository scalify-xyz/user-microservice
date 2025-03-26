
import { User } from "@domain/entity/user.entity";

import { SaveDTO, SaveResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

export class CreateUserUsecase {
    private constructor(
        private readonly userRepository: UserRepository,
    ) { }

    public static create(userRepository: UserRepository) {
        return new CreateUserUsecase(userRepository);
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