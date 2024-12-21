import { UseCase } from "src/application/interfaces/usecase.interface";

import { ChangePasswordDTO, ChangePasswordResponseDTO, IUserRepository } from "@domain/interfaces/repositories/user.interface.repository";

import { IEncryptProvider } from "@infra/interfaces/providers/encrypt.interface.provider";


export class UpdatePasswordUserUsecase implements UseCase<ChangePasswordDTO, ChangePasswordResponseDTO> {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly encryptProvider: IEncryptProvider,
    ) { }

    public static create(userRepository: IUserRepository, encryptProvider: IEncryptProvider) {
        return new UpdatePasswordUserUsecase(userRepository, encryptProvider);
    }

    public async execute({ email, password }: ChangePasswordDTO): Promise<ChangePasswordResponseDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        const hashedPassword = await this.encryptProvider.hash(password);

        await this.userRepository.updatePassword(user.id, hashedPassword);

        return {};
    }
}