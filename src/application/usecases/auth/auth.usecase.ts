import { IUserRepository, LoginDTO, LoginResponseDTO } from "@domain/interfaces/repositories/user.interface.repository";

import { UseCase } from "@application/interfaces/usecase.interface";


import { IEncryptProvider } from "@infrastructure/interfaces/providers/encrypt.interface.provider";
import { IJsonWebTokenProvider } from "@infrastructure/interfaces/providers/jsonwebtoken.interface.provider";



export class AuthUsecase implements UseCase<LoginDTO, LoginResponseDTO> {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly encryptProvider: IEncryptProvider,
        private readonly jwtProvider: IJsonWebTokenProvider,
    ) { }

    public static create(userRepository: IUserRepository, encryptProvider: IEncryptProvider, jwtProvider: IJsonWebTokenProvider) {
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