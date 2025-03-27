import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

import { CreateUserDTO, CreateUserResponseDTO } from "./create.schema";

export class CreateUserUsecase {
    private constructor(
        private readonly userRepository: UserRepository,
    ) { }

    public static create(userRepository: UserRepository) {
        return new CreateUserUsecase(userRepository);
    }

    public async execute({ name, email, password }: CreateUserDTO): Promise<CreateUserResponseDTO> {
        const verificationUser = await this.userRepository.findByEmail(email);
        if (verificationUser?.id) {
            throw new Error("Email is already being used");
        }

        const output = await this.userRepository.save({ name, email, password });

        return { id: output.id };
    }
}