import { UseCase } from "../"
import { User } from "../../domain/entity/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";

export type AuthUserInputDto = {
    email: string;
    password: string;
}

export type AuthUserOutputDto = {
    jwt: string;
}

export class AuthUserUsecase implements UseCase<AuthUserInputDto, AuthUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway) { }

    public static create (userGateway: UserGateway) {
        return new AuthUserUsecase(userGateway);
    }

    public async execute({ email, password }: AuthUserInputDto): Promise<any> {
        const login = await this.userGateway.login(email, password);

        // const output: AuthUserOutputDto = {
        //     jwt: login
        // }

        return login;
    }
 }