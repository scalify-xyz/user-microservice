import { UseCase } from "../";
import { User } from "../../domain/entity/user.entity";
import { IUserGatewayRepository } from "../../domain/gateway/repositories/user.gateway.repository";

export type CreateUserInputDto = {
    name: string;
    email: string;
    password: string;
}

export type CreateUserOutputDto = {
    id: string;
}

export class CreateUserUsecase implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
    private constructor(private readonly userRepository: IUserGatewayRepository) { }

    public static create (userRepository: IUserGatewayRepository) {
        return new CreateUserUsecase(userRepository);
    }

    public async execute({ name, email, password }: CreateUserInputDto): Promise<CreateUserOutputDto> {
        if (password.length < 5 ) {
            throw new Error("Password is too weak");
       }

        const user = User.create(name, email, password);

        await this.userRepository.save(user);

        const output: CreateUserOutputDto = {
            id: user.id,
        };

        return output;
    }
 }