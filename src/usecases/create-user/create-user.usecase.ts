import { UseCase } from "../"
import { User } from "../../domain/entity/user.entity";
import { UserGateway } from "../../domain/gateway/user.gateway";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string;
}

export type CreateUserOutputDto = {
    id: string;
}

export class CreateUserUsecase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
    private constructor(private readonly userGateway: UserGateway) { }

    public static create (userGateway: UserGateway) {
        return new CreateUserUsecase(userGateway);
    }

    public async execute({ name, email, password }: CreateUserInputDto): Promise<CreateUserOutputDto> {
        if (password.length < 5 ) {
            throw new Error("Password is too weak")
       }

        const user = User.create(name, email, password)

        await this.userGateway.save(user);

        const output: CreateUserOutputDto = {
            id: user.id
        }

        return output;
    }
 }