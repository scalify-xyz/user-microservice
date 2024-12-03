import { UseCase } from "../";
import { UserGateway } from "../../domain/gateway/user.gateway";

export type AuthUserInputDto = {
    email: string;
    password: string;
}

export type AuthUserOutputDto = {
    token: string;
}

export class AuthUserUsecase implements UseCase<AuthUserInputDto, AuthUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway) { }

    public static create(userGateway: UserGateway) {
        return new AuthUserUsecase(userGateway);
    }

    public async execute({ email, password }: AuthUserInputDto): Promise<AuthUserOutputDto> {
        const login = await this.userGateway.login(email, password);

        const output: AuthUserOutputDto = {
            token: login.token,
        };

        return output;
    }
}