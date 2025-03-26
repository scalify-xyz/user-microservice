
import { IEncryptProvider } from "@infrastructure/providers/interfaces/encrypt.interface.provider";
import { IJsonWebTokenProvider } from "@infrastructure/providers/interfaces/jsonwebtoken.interface.provider";
import { LoginDTO, LoginResponseDTO } from "@infrastructure/repositories/interfaces/user.interface.repository";
import { UserRepository } from "@infrastructure/repositories/prisma/user.repository.prisma";

export class AuthUsecase {
    private constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptProvider: IEncryptProvider,
        private readonly jwtProvider: IJsonWebTokenProvider,
    ) { }

    public static create(userRepository: UserRepository, encryptProvider: IEncryptProvider, jwtProvider: IJsonWebTokenProvider) {
        return new AuthUsecase(userRepository, encryptProvider, jwtProvider);
    }

    public async execute({ email, password }: LoginDTO): Promise<LoginResponseDTO> {
        const user = await this.userRepository.findByEmail(email);

        const token = this.jwtProvider.sign({ id: user?.id, email: user?.email }, process.env.JWT_SECRET);
        
        if (!token || !user || !(await this.encryptProvider.verify(user.password, password))) {
            throw new Error("Authentication failure");
        }

        const output: LoginResponseDTO = {
            token: token,
        };

        return output;
    }
}