import { IEncryptProvider } from "@infrastructure/providers/interfaces/encrypt.interface.provider";
import { ChangePasswordDTO, ChangePasswordResponseDTO, IUserRepository } from "@infrastructure/repositories/interfaces/user.interface.repository";



export class UpdatePasswordUsecase {
    private constructor(
        private readonly userRepository: IUserRepository,
        private readonly encryptProvider: IEncryptProvider,
    ) { }

    public static create(userRepository: IUserRepository, encryptProvider: IEncryptProvider) {
        return new UpdatePasswordUsecase(userRepository, encryptProvider);
    }

    public async execute({ email, password }: ChangePasswordDTO): Promise<ChangePasswordResponseDTO> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (password.length < 5) {
            throw new Error("Password is too weak");
        }

        const hashedPassword = await this.encryptProvider.hash(password);

        await this.userRepository.updatePassword(user.id, hashedPassword);

        return {};
    }
}