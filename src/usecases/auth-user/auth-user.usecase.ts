import { UseCase } from "../";
import { IUserGatewayRepository, LoginDTO, LoginResponseDTO } from "../../domain/gateway/repositories/user.gateway.repository";


export class AuthUserUsecase implements UseCase<LoginDTO, LoginResponseDTO> {
    private constructor(private readonly userRepository: IUserGatewayRepository) { }

    public static create(userRepository: IUserGatewayRepository) {
        return new AuthUserUsecase(userRepository);
    }

    public async execute({ email, password }: LoginDTO): Promise<LoginResponseDTO> {
        const login = await this.userRepository.login({ email, password });

        const output: LoginResponseDTO = {
            token: login.token,
        };

        return output;
    }
}