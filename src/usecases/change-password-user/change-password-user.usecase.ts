import { ChangePasswordDTO, ChangePasswordResponseDTO, IUserGatewayRepository } from "@domain/interfaces/repositories/user.interface.repository";

import { UseCase } from "@usecases/index";

export class ChangePasswordUserUsecase implements UseCase<ChangePasswordDTO, ChangePasswordResponseDTO> {
    private constructor(private readonly userRepository: IUserGatewayRepository) { }

    public static create(userRepository: IUserGatewayRepository) {
        return new ChangePasswordUserUsecase(userRepository);
    }

    public async execute({ email, password }: ChangePasswordDTO): Promise<ChangePasswordResponseDTO> {
        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        await this.userRepository.changePassword({ email, password });

        return {};
    }
}