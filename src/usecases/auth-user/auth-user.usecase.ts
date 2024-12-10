import { UseCase } from "../";
import { IUserGatewayRepository } from "../../domain/gateway/repositories/user.gateway.repository";

export type AuthUserInputDto = {
    email: string;
    password: string;
}

export type AuthUserOutputDto = {
    token: string;
}

export class AuthUserUsecase implements UseCase<AuthUserInputDto, AuthUserOutputDto> {
    private constructor(private readonly userRepository: IUserGatewayRepository) { }

    public static create(userRepository: IUserGatewayRepository) {
        return new AuthUserUsecase(userRepository);
    }

    public async execute({ email, password }: AuthUserInputDto): Promise<AuthUserOutputDto> {
        const login = await this.userRepository.login(email, password);

        const output: AuthUserOutputDto = {
            token: login.token,
        };

        return output;
    }
}