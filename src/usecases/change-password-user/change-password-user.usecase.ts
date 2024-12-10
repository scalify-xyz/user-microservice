import { UseCase } from "../";
import { IUserGatewayRepository } from "../../domain/gateway/repositories/user.gateway.repository";

export type ChangePasswordUserInputDto = {
    password: string;
    email: string;
}

export type ChangePasswordUserOutputDto = {}

export class ChangePasswordUserUsecase implements UseCase<ChangePasswordUserInputDto, ChangePasswordUserOutputDto> {
    private constructor(private readonly userRepository: IUserGatewayRepository) { }

    public static create(userRepository: IUserGatewayRepository) {
        return new ChangePasswordUserUsecase(userRepository);
    }

    public async execute({ email, password }: ChangePasswordUserInputDto): Promise<ChangePasswordUserOutputDto> {
        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        await this.userRepository.changePassword(email, password);

        return {};
    }
}