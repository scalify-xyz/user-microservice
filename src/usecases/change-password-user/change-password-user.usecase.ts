import { UseCase } from "../"
import { UserGateway } from "../../domain/gateway/user.gateway";

export type ChangePasswordUserInputDto = {
    password: string;
    email: string;
}

export type ChangePasswordUserOutputDto = {}

export class ChangePasswordUserUsecase implements UseCase<ChangePasswordUserInputDto, ChangePasswordUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway) { }

    public static create(userGateway: UserGateway) {
        return new ChangePasswordUserUsecase(userGateway);
    }

    public async execute({ email, password }: ChangePasswordUserInputDto): Promise<any> {
        await this.userGateway.changePassword(email, password);
    }
}